import { object, optional, parse, picklist, string } from 'valibot'
import type { PostgrestError } from '@supabase/supabase-js'
import supabase from '@/plugins/supabase'

function throwIfNok(res: string, event: string) {
  if (res !== 'ok') {
    throw new ApiError(`Failed broadcast ${event}: ${res}`)
  }
}

function throwIfError(error: PostgrestError | null) {
  if (error) {
    throw new ApiError(error.message)
  }
}

function gameModel(raw: any) {
  try {
    return parse(object({
      id: string(),
      name: string(),
      vote_system: string(),
      last_used_at: string(),
    }), raw)
  }
  catch (error) {
    throw new ApiError(`Couldn't parse game info`)
  }
}
type IGame = ReturnType<typeof gameModel>

function userModel(raw: any) {
  try {
    return parse(object({
      name: string(),
      vote: optional(string()),
    }), raw)
  }
  catch (error) {
    throw new ApiError(`Couldn't parse user info`)
  }
}
type IUser = ReturnType<typeof userModel>
function voteSystemModel(raw: any) {
  try {
    return parse(picklist(VoteSystems), raw)
  }
  catch (error) {
    throw new ApiError(`Couldn't parse vote system`)
  }
}

const PgGameTable = 'games'
const Messages = {
  ShowResult: 'show_result',
  Reset: 'reset_result',
} as const

export async function createGame(name: string, voteSystem: string) {
  const { data, error } = await supabase
    .from(PgGameTable)
    .insert({ name, vote_system: voteSystem })
    .select()

  throwIfError(error)
  return gameModel(data?.at(0))
}

export function useUser() {
  const user = useLocalStorage<IUser>('my-user', {
    name: getRandomUserName(),
    vote: undefined,
  })

  return user
}

export function useGamesHistory() {
  // Do not keep type identity, and use simple type for store
  type IHGame = { id: string, name: string, lastUse: number }
  const history = useLocalStorage<Array<IHGame>>('my-games', [])

  function add(game: IGame) {
    remove(game.id)
    history.value.push({ id: game.id, name: game.name, lastUse: Date.now() })
    // Sort and leave first 5 games
    history.value.sort((a, b) => b.lastUse - a.lastUse).splice(5)
  }
  function remove(gameId: string) {
    const idx = history.value.findIndex(a => a.id === gameId)
    if (idx >= 0) {
      history.value.splice(idx, 1)
    }
  }
  return {
    history,
    add,
    remove,
  }
}

export function useGame(id: string, user: Ref<IUser>) {
  const { add: addHistory } = useGamesHistory()
  /** Game info, export with `name` and `vote_system` property */
  const game = shallowRef<IGame>()
  /** Game state, exports as readonly ref */
  const state = shallowRef<Array<IUser>>([])

  /** Show result flag */
  const showResult = ref(false)

  /** Visibility to check user activity */
  const visibility = useDocumentVisibility()

  const room = supabase.channel(`game-${id}`)

  // #region helper functions

  function onGameUpdate(raw: any) {
    game.value = gameModel(raw)
    addHistory(game.value)

    // Refresh last used day if need
    const today = DateTime.fromISO(DateTime.now().toISODate())
    const lasGameDate = DateTime.fromISO(game.value.last_used_at)
    if (lasGameDate.isValid && today.isValid
      && lasGameDate.toMillis() < today.toMillis()) {
      updateGame({ last_used_at: today.toISODate() })
    }
  }
  function onStateSync(raw: any) {
    state.value = Object.values(raw).flat().map(userModel)
  }
  function onShowResult(raw: any) {
    showResult.value = Boolean(raw)
  }
  function onReset() {
    user.value.vote = undefined
  }

  async function send(event: typeof Messages.ShowResult, payload: { value: boolean }): Promise<void>
  async function send(event: typeof Messages.Reset): Promise<void>
  async function send(event: string, payload?: unknown): Promise<void> {
    const res = await room.send({ type: 'broadcast', event, payload })
    throwIfNok(res, event)
  }

  async function track(data: IUser) {
    const res = await room.track(data)
    throwIfNok(res, 'presence-sync')
  }

  async function loadGame() {
    const { data, error } = await supabase.from(PgGameTable).select().eq('id', id)
    throwIfError(error)
    onGameUpdate(data?.at(0))
  }

  async function updateGame(game: Partial<Omit<IGame, 'id'>>) {
    const { error } = await supabase.from(PgGameTable).update(game).eq('id', id)
    throwIfError(error)
    /**
     * Мы отправили обновлённую информацию, но НЕ присвоили значения переменной.
     * Хендлер @see onGameUpdate будет вызван подпиской на изменения PG.
     * Таким образом мы избегаем ситуации когда у разных пользователей может отображаться разная информация.
     */
  }

  // #endregion

  room
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: PgGameTable, filter: `id=eq.${id}` },
      a => onGameUpdate(a.new),
    )
    .on('presence', { event: 'sync' }, () => onStateSync(room.presenceState()))
    .on('broadcast', { event: Messages.ShowResult }, ({ payload }) => onShowResult(payload.value))
    .on('broadcast', { event: Messages.Reset }, () => onReset())
    .subscribe()
  onUnmounted(() => room.unsubscribe())

  /** Load game info */
  loadGame()
  /** Track current user `name` and `vote` */
  watch(user, data => track(data), { deep: true, immediate: true })
  /** Track show result flag @see showResult */
  watchEffect(() => send(Messages.ShowResult, { value: showResult.value }))
  /** Track visibility and updade track state */
  watch(visibility, vis => vis === 'visible' && track(user.value))

  const gameName = computed({
    get: () => game.value?.name,
    set: val => updateGame({ name: val }),
  })

  const voteSystemName = computed({
    get: () => voteSystemModel(game.value?.vote_system),
    set: val => updateGame({ vote_system: val }),
  })

  /** Reset all votes */
  async function reset() {
    showResult.value = false
    await send(Messages.Reset)
    onReset()
  }

  return {
    gameName,
    showResult,
    voteSystemName,
    state: computed(() => state.value),
    reset,
  }
}
