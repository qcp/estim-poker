<script setup lang="ts">
import PToast from 'primevue/toast'
import { RouterView } from 'vue-router'
import { useTheme } from './composables/useTheme'
import { useErrorHandler } from './composables/useErrorHandler'

const { themeIcon, toggleTheme } = useTheme()
const { handleError } = useErrorHandler()

function openGithub() {
  window.open('https://github.com/qcp/estim-poker', '_blank')
}

onErrorCaptured(error => handleError(error))
window.addEventListener('error', e => handleError(e.error), true)
window.addEventListener('unhandledrejection', e => handleError(e.reason), true)
</script>

<template>
  <p-toast />
  <section class="main">
    <router-view />
    <stack-footer />
  </section>
  <div class="tool-bar">
    <p-button icon="pi pi-github" text rounded @click="() => openGithub()" />
    <p-button :icon="themeIcon" text rounded @click="() => toggleTheme()" />
  </div>
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
  height: 100%;
}
.p-button:enabled:focus {
  box-shadow: unset;
}
</style>

<style scoped>
.main {
  padding: 1em;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.tool-bar {
  position: absolute;
  right: var(--inline-spacing);
  top: var(--inline-spacing);

  display: flex;
  gap: var(--inline-spacing);
}
</style>
