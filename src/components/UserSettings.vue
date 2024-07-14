<script setup lang="ts">
const username = defineModel<string>('username')
const usernameDraft = ref<string>()

watch(
  () => username.value,
  () => (usernameDraft.value = username.value),
  { immediate: true },
)
const constraint = computed(() => {
  const errors = new Map<'username', string>()
  const name = usernameDraft.value?.trim()
  if (!name) {
    errors.set('username', `Name must be non empty`)
  }
  else if (name.length < 3) {
    errors.set('username', `Name must be at least 3 symbol length`)
  }
  else if (name.length > 15) {
    errors.set('username', `Name must be less 15 symbol length`)
  }
  return errors
})
watchDebounced(
  () => usernameDraft.value,
  () => {
    const name = usernameDraft.value?.trim()
    if (name && constraint.value.size === 0) {
      username.value = name.trim()
    }
  },
  { debounce: 1000 },
)
</script>

<template>
  <div class="username-container">
    <span class="usename-input">
      <p-input-text
        id="username"
        v-model="usernameDraft"
        :class="{ 'p-invalid': constraint.has('username') }"
        :maxlength="20"
      />
      <i v-show="usernameDraft !== username && constraint.size === 0" class="pi pi-spin pi-spinner" />
    </span>
    <small v-if="constraint.has('username')" id="username-help">{{ constraint.get('username') }}</small>
  </div>
</template>

<style scoped>
.username-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.usename-input {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
</style>
