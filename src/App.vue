<script setup lang="ts">
import PToast from 'primevue/toast'
import { RouterView } from 'vue-router'
import { useTheme } from './composables/useTheme'
import { useErrorHandler } from './composables/useErrorHandler'

const { themeIcon, toggleTheme } = useTheme()
const router = useRouter()

const { handleError } = useErrorHandler({
  onApiError: (error) => {
    if (error.message === `Couldn't parse game info`) {
      router.push({ name: 'hello' })
    }
  },
})

function openGithub() {
  window.open('https://github.com/qcp/estim-poker', '_blank')
}

// Register listener only once
onMounted(() => {
  onErrorCaptured(error => handleError(error))
  useEventListener(window, 'error', e => handleError(e.error), true)
  useEventListener(window, 'unhandledrejection', e => handleError(e.reason), true)
})
</script>

<template>
  <p-toast />
  <div class="tool-bar">
    <p-button icon="pi pi-github" text rounded @click="() => openGithub()" />
    <p-button :icon="themeIcon" text rounded @click="() => toggleTheme()" />
  </div>
  <router-view />
</template>

<style>
html {
  height: 100%;
}
body {
  margin: unset;
  height: 100%;
  background-color: var(--surface-ground);
}
#app {
  overflow: hidden;
  height: 100%;
}
.p-button:enabled:focus {
  box-shadow: unset;
}
</style>

<style scoped>
.tool-bar {
  position: absolute;
  right: var(--inline-spacing);
  top: var(--inline-spacing);

  display: flex;
  gap: var(--inline-spacing);
}
</style>
