<script setup lang="ts">
const props = defineProps<{
  result: Array<{
    name: string
    vote?: string
  }>
  show: boolean
}>()

const MaxRowsInColumn = 5
</script>

<template>
  <div
    class="result-list"
    :style="{
      gridAutoRows: `repeat(${MaxRowsInColumn}, 1fr)`,
      gridTemplateColumns: `repeat(${Math.ceil(props.result.length / MaxRowsInColumn)}, 1fr)`,
    }"
  >
    <div v-for="({ name, vote }, idx) of props.result" :key="idx" class="result-item">
      <span>{{ name }} </span>
      <transition :name="vote && 'flip'" mode="out-in">
        <poker-card
          :key="`${idx}-${props.show}`"
          :style="{
            '--transition-delay': `${Math.random() / 2}s`,
          }"
          class="card"
          :vote="vote"
          :hided="!props.show"
        />
      </transition>
    </div>
  </div>
</template>

<style scoped>
.result-list {
  display: grid;
  gap: 0.5em 2em;
}

.result-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1em;
}

.card {
  backface-visibility: hidden;
  font-size: 0.8em;
}

.flip-enter-active {
  transition: rotate 0.2s ease;
}

.flip-leave-active {
  transition: rotate 0.2s ease;
  transition-delay: var(--p-transition-delay);
}

.flip-enter-from,
.flip-leave-to {
  rotate: y 90deg;
}
</style>
