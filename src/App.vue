<script setup lang="ts">
import PToast from 'primevue/toast'
import { RouterView } from 'vue-router'
import { useTheme } from './composables/useTheme'
import { useErrorHandler } from './composables/useErrorHandler'

const { themeIcon, toggleTheme } = useTheme()
const { handleError } = useErrorHandler()

onErrorCaptured((error) => handleError(error))
window.addEventListener('error', (e) => handleError(e.error), true)
window.addEventListener('unhandledrejection', (e) => handleError(e.reason), true)
</script>

<template>
  <p-toast />
  <section class="main">
    <router-view />
    <stack-footer />
  </section>
  <div class="theme">
    <i :class="themeIcon" @click="() => toggleTheme()" />
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
.theme {
  position: absolute;
  right: 1em;
  top: 1em;
  cursor: pointer;
}
</style>
