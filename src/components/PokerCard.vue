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
      selected: props.selected
    }"
  >
    <i style="font-size: inherit" v-if="!props.vote" class="pi pi-question" />
    <i
      style="font-size: inherit; color: var(--green-400)"
      v-else-if="props.hided"
      class="pi pi-check"
    />
    <span v-else> {{ props.vote }}</span>
  </div>
</template>

<style scoped>
.card {
  cursor: pointer;
  border: 1px solid var(--surface-400);
  border-radius: var(--border-radius);
  background-color: var(--surface-50);

  width: 4ch;
  aspect-ratio: 2 / 3; /* brige size */

  display: flex;
  justify-content: center;
  align-items: center;

  font-weight: bold;

  transition: all 0.1s ease-out;
}

.card.with-hover:hover {
  border-color: var(--surface-500);
  translate: 0 calc(var(--inline-spacing) * -1);
}
.card.selected {
  border-color: var(--color-border-hover);
  translate: 0 calc(var(--inline-spacing) * -1);
  background-color: var(--color-background);
}
.card.selected::before {
  content: '▴';
  color: var(--primary-color);
  position: absolute;
  bottom: calc(var(--inline-spacing) * -2);
}
</style>
