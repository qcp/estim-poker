<script setup lang="ts">
import type { IVoteSystems } from '@/constants/voteSystem'

const props = defineProps<{
  result: Array<{
    name: string
    vote?: string
  }>
  voteSystemName: IVoteSystems
  show: boolean
}>()

const usersNoVote = computed(() => props.result.filter(({ vote }) => !vote).map(({ name }) => name))

const usersByVote = computed(() => {
  const grouped: Record<string, Array<string>> = {}

  for (const { name, vote } of props.result) {
    if (!vote) {
      continue
    }

    if (grouped[vote]) {
      grouped[vote] = [...grouped[vote], name]
    }
    else {
      grouped[vote] = [name]
    }
  }

  return Object.entries(grouped)
    .sort(([, arr1], [, arr2]) => arr2.length - arr1.length)
})
</script>

<template>
  <transition name="slide" mode="out-in">
    <div v-if="!props.show" class="result-waiting">
      <i v-if="usersNoVote.length > 0" class="pi pi-spin pi-spinner" style="font-size: 3em;" />
      <i v-else class="pi pi-check" style="font-size: 3em;" />

      <span v-if="usersNoVote.length > 2"> Waiting {{ usersNoVote.length }} users... </span>
      <span v-else-if="usersNoVote.length > 0"> Waiting {{ usersNoVote.join(' and ') }}... </span>
      <span v-else> Ready to reveal </span>
    </div>
    <div v-else class="result-wrapper">
      <div class="result-list">
        <div v-for="([vote, names], idx) of usersByVote" :key="idx" class="result-item">
          <transition :name="vote && 'flip'" mode="out-in">
            <poker-card
              :key="`${idx}-${props.show}`"
              class="card"
              :vote="vote"
            />
          </transition>
          <span v-if="names.length > 1"> x<b>{{ names.length }}</b> </span>
          <span style="color: var(--text-color-secondary)">{{ names.join(', ') }} </span>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.result-waiting {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.result-wrapper {
  height: 100%;
  width: 100%;
  overflow: auto;
  padding: 0 calc(1rem * 3);
  display: flex;
  align-items: center;
}

.result-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem
}

.result-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.card {
  backface-visibility: hidden;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.25s ease-out;
}

.slide-enter-from {
  opacity: 0;
  translate: 0 10ch;
}

.slide-leave-to {
  opacity: 0;
  translate: 0 -10ch;
}
</style>
