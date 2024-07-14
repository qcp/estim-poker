<script setup lang="ts">
import PToast from 'primevue/toast'
import { RouterView } from 'vue-router'
import { useErrorHandler } from './composables/useErrorHandler'

const router = useRouter()

const { handleError } = useErrorHandler({
  onApiError: (error) => {
    if (error.message === `Couldn't parse game info`) {
      router.push({ name: 'hello' })
    }
  },
})

// Register listener only once
onMounted(() => {
  onErrorCaptured(error => handleError(error))
  useEventListener(window, 'error', e => handleError(e.error), true)
  useEventListener(window, 'unhandledrejection', e => handleError(e.reason), true)
})
</script>

<template>
  <p-toast />
  <router-view />
</template>
