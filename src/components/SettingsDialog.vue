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
      footer: { style: 'justify-content: center' },
    }"
  >
    <div class="settings">
      <div class="group">
        <label>Game name</label>
        <p-input-text
          v-model="gameNameDraft"
          :maxlength="20"
          :invalid="constraint.has('gameName')"
        />
        <small v-if="constraint.has('gameName')">{{ constraint.get('gameName') }}</small>
      </div>
      <div class="group">
        <label>Game vote system</label>
        <p-select
          v-model="voteSystemNameDraft"
          :options="voteSystemOptions"
          :invalid="constraint.has('voteSystemName')"
          option-value="name"
          option-label="description"
        />
        <small v-if="constraint.has('voteSystemName')">{{ constraint.get('voteSystemName') }}</small>
      </div>
      <div class="group">
        <label>Vote system preview</label>
        <cards-selector :vote-system-name="voteSystemNameDraft" />
      </div>
    </div>
    <template #footer>
      <p-button
        icon="pi pi-save"
        label="save"
        severity="success"
        :disabled="constraint.size > 0"
        @click="save"
      />
    </template>
  </p-dialog>
</template>

<style scoped>
.settings {
  display: flex;
  flex-direction: column;
  gap: calc(1rem * 1.5);
}

.group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>
