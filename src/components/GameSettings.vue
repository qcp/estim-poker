<script setup lang="ts">
import type { IVoteSystems } from '@/constants/voteSystem'

const gameName = defineModel<string>('gameName', { required: true })
const voteSystemName = defineModel<IVoteSystems>('voteSystemName', { required: true })

const voteSystemOptions = computed(() =>
  VoteSystems.map(name => ({
    name,
    description: VoteSystemConfig[name].description,
  })),
)
</script>

<template>
  <div class="settings">
    <div class="group">
      <span>Game name</span>
      <p-input-text v-model="gameName" :class="{ 'p-invalid': !gameName }" :maxlength="10" />
    </div>
    <div class="group">
      <span>Game vote system</span>
      <p-dropdown
        v-model="voteSystemName"
        :options="voteSystemOptions"
        option-value="name"
        option-label="description"
      />
    </div>
    <div class="group">
      <span>Vote system preview</span>
      <cards-selector :vote-system-name="voteSystemName" />
    </div>
  </div>
</template>

<style scoped>
.settings {
  display: flex;
  flex-direction: column;
  gap: calc(var(--content-padding) * 1.5);
  padding: var(--content-padding);
}
.group {
  display: flex;
  flex-direction: column;
  gap: var(--inline-spacing);
}
</style>
