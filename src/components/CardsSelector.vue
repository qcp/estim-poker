<script setup lang="ts">
import type { IVoteSystems } from '@/constants/voteSystem'

const props = defineProps<{
  voteSystemName: IVoteSystems
}>()

const voteSystem = computed(() => VoteSystemConfig[props.voteSystemName])

const vote = defineModel<string>('vote')
</script>

<template>
  <div class="cards">
    <poker-card
      v-for="{ name, tooltip } of voteSystem.options"
      :key="name"
      v-tooltip.top="tooltip"
      :vote="name"
      :selected="vote === name"
      with-hover
      @click="vote = vote === name ? undefined : name"
    />
  </div>
</template>

<style scoped>
.cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  column-gap: 0.5em;
  row-gap: 1em;
}
</style>
