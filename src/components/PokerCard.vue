<script setup lang="ts">
const props = defineProps<{
  vote?: string
  hided?: boolean
  selected?: boolean
  withHover?: boolean
}>()
</script>

<template>
  <div
    class="card"
    :class="{
      'with-hover': props.withHover,
      'selected': props.selected,
    }"
  >
    <i v-if="!props.vote" style="font-size: inherit;" class="pi pi-question" />
    <i
      v-else-if="props.hided"
      style="font-size: inherit; color: var(--p-green-400);"
      class="pi pi-check"
    />
    <span v-else> {{ props.vote }}</span>
  </div>
</template>

<style scoped>
.card {
  --card-background: var(--ground-background);
  --card-border-color: var(--p-surface-400);

  cursor: pointer;
  border-radius: 0.2em;
  border: 1px solid var(--card-border-color);
  background-color: var(--card-background);
  width: 4ch;
  aspect-ratio: 2 / 3; /* brige size */
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  transition: all 0.1s ease-out;
}

.card.with-hover:hover {
  translate: 0 calc(0.5rem * -1);
}

.card.selected {
  border-color: var(--p-color-border-hover);
  translate: 0 calc(0.5rem * -1);
  background-color: var(--p-color-background);
}

.card.selected::before {
  content: "▴";
  color: var(--p-primary-color);
  position: absolute;
  bottom: calc(0.5rem * -2);
}
</style>
