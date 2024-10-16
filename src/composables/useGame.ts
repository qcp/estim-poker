import type { IVoteSystems } from '@/constants/voteSystem'
import { array, boolean, flatten, object, optional, parse, picklist, safeParse, string } from 'valibot'

function getUrl(type: 'http' | 'ws') {
  switch (type) {
    case 'http': return 'https://estim-poker.deno.dev'
    case 'ws': return 'wss://estim-poker.deno.dev'
    // case 'http': return 'http://localhost:8000'
    // case 'ws': return 'ws://localhost:8000'
  }
}

type IUser = {
  id: string
  name: string
  vote?: string
}
type IGame = {
  id: string
  name: string
  showResults: boolean
  voteSystem: IVoteSystems
  users: Array<IUser>
  userId: string
}

export async function createGame(name: string, voteSystem: string) {
  const response = await fetch(getUrl('http'), {
    method: 'POST',
    body: JSON.stringify({ name, voteSystem }),
  })
  const rawBodyJson = await response.json()
  return parse(
    object({ id: string() }), // Need only id
    rawBodyJson,
  )
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

export function useGame(roomId: string) {
  const { add: addHistory, remove: removeHistory } = useGamesHistory()
  const game = shallowRef<IGame>()
  const user = useLocalStorage<Pick<IUser, 'name' | 'vote'>>('my-user', {
    name: getRandomUserName(),
    vote: undefined,
  })

  function onUpdated(rawData: unknown) {
    const parsedData = safeParse(
      object({
        id: string(),
        name: string(),
        showResults: boolean(),
        voteSystem: picklist(VoteSystems),
        users: array(object({ id: string(), name: string(), vote: optional(string()) })),
        userId: string(),
      }),
      rawData,
    )

    if (!parsedData.success) {
      console.warn('Broken ws payload', flatten(parsedData.issues))
      return
    }

    const parsedGame = parsedData.output
    game.value = parsedGame

    const thisUser = parsedGame.users.find(a => a.id === parsedGame.userId)
    if (!thisUser) {
      console.warn(`Couldn't find user ${parsedGame.userId} in user list`)
    }
    else {
      user.value = { name: thisUser.name, vote: thisUser.vote }
    }

    addHistory(parsedGame)
  }

  const ws = useWebSocket(`${getUrl('ws')}/${roomId}`, {
    autoReconnect: {
      retries: 3,
      delay: 5 * 1000,
      onFailed: () => removeHistory(roomId),
    },
    heartbeat: {
      interval: 15 * 1000,
    },
    onConnected() {
      changeName(user.value.name)
    },
    onDisconnected(ws, event) {
      console.warn('onDisconnected', event)
    },
    onError(ws, event) {
      console.error('onError', event)
    },
    onMessage(ws, event) {
      if (event.data === 'pong') {
        return
      }
      try {
        const jsonData = JSON.parse(event.data)
        onUpdated(jsonData)
      }
      catch (ex) {
        console.error(`Couldn't parsed incoming message`, event.data, ex)
      }
    },
  })

  async function updateGame(params: Pick<IGame, 'name' | 'voteSystem'>) {
    await fetch(getUrl('http'), {
      method: 'POST',
      body: JSON.stringify({ id: roomId, ...params }),
    })
  }

  async function resetResults() {
    ws.send(JSON.stringify({ type: 'reset-results' }))
  }

  async function toggleResults() {
    ws.send(JSON.stringify({ type: 'toggle-results' }))
  }

  async function changeName(newName: string) {
    ws.send(JSON.stringify({ type: 'change-name', name: newName }))
  }

  async function changeVote(newVote?: string) {
    ws.send(JSON.stringify({ type: 'change-vote', vote: newVote }))
  }

  return {
    status: computed(() => ws.status.value),
    game: computed(() => game.value),
    updateGame,
    user: computed(() => user.value),
    changeName,
    changeVote,
    resetResults,
    toggleResults,
  }
}
