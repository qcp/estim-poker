<script setup lang="ts">
import type { IVoteSystems } from '@/constants/voteSystem'

const gameName = defineModel<string>('gameName')
const voteSystemName = defineModel<IVoteSystems>('voteSystemName')

const gameNameDraft = ref<string>(getRandomGameName())
const voteSystemNameDraft = ref<IVoteSystems>('fibonachi')

watch(
  gameName,
  () => {
    if (gameName.value) gameNameDraft.value = gameName.value
  },
  { immediate: true }
)
watch(
  gameName,
  () => {
    if (voteSystemName.value) voteSystemNameDraft.value = voteSystemName.value
  },
  { immediate: true }
)

const saveReady = computed(
  () =>
    // Required field exist
    gameNameDraft.value &&
    voteSystemNameDraft.value &&
    // Has any changes in fields
    !(gameName.value == gameNameDraft.value && voteSystemName.value == voteSystemNameDraft.value)
)
function save() {
  gameName.value = gameNameDraft.value
  voteSystemName.value = voteSystemNameDraft.value

  visible.value = false
}

const [visible, toggle] = useToggle()
defineExpose({ toggle })
</script>

<template>
  <p-dialog
    v-model:visible="visible"
    modal
    header="Game settings"
    :pt="{
      header: { style: 'padding: var(--inline-spacing)' },
      content: { style: 'padding: unset' }
    }"
  >
    <game-settings
      v-model:game-name="gameNameDraft"
      v-model:vote-system-name="voteSystemNameDraft"
    />
    <div class="actions">
      <p-button
        icon="pi pi-save"
        label="save"
        severity="success"
        :disabled="!saveReady"
        @click="save"
      />
    </div>
  </p-dialog>
</template>

<style scoped>
.actions {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--inline-spacing);
}
</style>
