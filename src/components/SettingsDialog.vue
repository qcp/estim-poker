<script setup lang="ts">
import type { IVoteSystems } from '@/constants/voteSystem'

const voteSystemOptions = computed(() =>
  VoteSystems.map(name => ({
    name,
    description: VoteSystemConfig[name].description,
  })),
)

const gameName = defineModel<string>('gameName')
const voteSystemName = defineModel<IVoteSystems>('voteSystemName')

const gameNameDraft = ref<string>(getRandomGameName())
const voteSystemNameDraft = ref<IVoteSystems>('fibonachi')

const [visible, toggle] = useToggle()

const constraint = computed(() => {
  const errors = new Map<'gameName' | 'voteSystemName', string>()
  const gameName = gameNameDraft.value?.trim()
  if (!gameName) {
    errors.set('gameName', `Name must be non empty`)
  }
  else if (gameName.length < 3) {
    errors.set('gameName', `Name must be at least 3 symbol length`)
  }
  else if (gameName.length > 15) {
    errors.set('gameName', `Name must be less 15 symbol length`)
  }
  if (!voteSystemNameDraft.value) {
    errors.set('voteSystemName', `Select prefered vote system`)
  }
  return errors
})

watch(
  gameName,
  () => {
    if (gameName.value) {
      gameNameDraft.value = gameName.value
    }
  },
  { immediate: true },
)
watch(
  voteSystemName,
  () => {
    if (voteSystemName.value) {
      voteSystemNameDraft.value = voteSystemName.value
    }
  },
  { immediate: true },
)

function save() {
  gameName.value = gameNameDraft.value.trim()
  voteSystemName.value = voteSystemNameDraft.value

  visible.value = false
}

defineExpose({ toggle })
</script>

<template>
  <p-dialog
    v-model:visible="visible"
    modal
    header="Game settings"
    :pt="{
      header: { style: 'padding: 0.5rem' },
      content: { style: 'padding: unset' },
    }"
  >
    <div class="settings">
      <div class="group">
        <span>Game name</span>
        <p-input-text
          id="game-name"
          v-model="gameNameDraft"
          :class="{ 'p-invalid': constraint.has('gameName') }"
          :maxlength="20"
        />
        <small v-if="constraint.has('gameName')" id="game-name-help">{{ constraint.get('gameName') }}</small>
      </div>
      <div class="group">
        <span>Game vote system</span>
        <p-select
          id="vote-system"
          v-model="voteSystemNameDraft"
          :options="voteSystemOptions"
          :class="{ 'p-invalid': constraint.has('voteSystemName') }"
          option-value="name"
          option-label="description"
        />
        <small v-if="constraint.has('voteSystemName')" id="vote-systemc">{{ constraint.get('voteSystemName') }}</small>
      </div>
      <div class="group">
        <span>Vote system preview</span>
        <cards-selector :vote-system-name="voteSystemNameDraft" />
      </div>
    </div>
    <div class="actions">
      <p-button
        icon="pi pi-save"
        label="save"
        severity="success"
        :disabled="constraint.size > 0"
        @click="save"
      />
    </div>
  </p-dialog>
</template>

<style scoped>
.settings {
  display: flex;
  flex-direction: column;
  gap: calc(1rem * 1.5);
  padding: 1rem;
}

.group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.actions {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
}
</style>
