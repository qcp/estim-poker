<script setup lang="ts">
const props = defineProps<{
  result: Array<{
    name: string
    vote?: string
  }>
  show: boolean
}>()
</script>

<template>
  <div class="result-wrapper">
    <ul
      class="result-list"
      :style="{
        gridAutoRows: `repeat(${5}, 1fr)`,
        gridTemplateColumns: `repeat(${Math.ceil(props.result.length / 5)}, 1fr)`
      }"
    >
      <li v-for="({ name, vote }, idx) of props.result" :key="idx" class="result-item">
        <span>{{ name }} </span>
        <transition :name="vote && 'flip'" mode="out-in">
          <poker-card
            :style="{
              '--transition-delay': `${Math.random() / 2}s`
            }"
            :key="`${idx}-${props.show}`"
            class="card"
            :vote="vote"
            :hided="!props.show"
          />
        </transition>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.result-wrapper {
  overflow: hidden;
  overflow: auto;
}
.result-list {
  padding: unset;

  list-style: none;
  display: grid;
  column-gap: 2em;
  row-gap: 0.5em;
}
.result-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1em;
}

.card {
  backface-visibility: hidden;
  perspective: 1000;
  font-size: 0.8em;
}

.flip-enter-active {
  transition: rotate 0.2s ease;
}
.flip-leave-active {
  transition: rotate 0.2s ease;
  transition-delay: var(--transition-delay);
}

.flip-enter-from,
.flip-leave-to {
  rotate: y 90deg;
}
</style>
