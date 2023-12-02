<script setup lang="ts">
const username = defineModel<string>('username')
const usernameDraft = ref<string>()

watch(
  () => username.value,
  () => (usernameDraft.value = username.value),
  { immediate: true },
)
watchDebounced(
  () => usernameDraft.value,
  (name) => {
    if (name) {
      username.value = name
    }
  },
  { debounce: 1000 },
)
</script>

<template>
  <span class="p-input-icon-right">
    <i v-show="usernameDraft !== username" class="pi pi-spin pi-spinner" />
    <p-input-text
      v-model="usernameDraft"
      :class="{ 'p-invalid': !usernameDraft }"
      :maxlength="10"
    />
  </span>
</template>

<style scoped></style>
