<script setup lang="ts">
import { useQRCode } from '@vueuse/integrations/useQRCode'
import { useToast } from 'primevue/usetoast'

const toast = useToast()
const location = useBrowserLocation()
const qrcode = useQRCode(location.value.href!, { errorCorrectionLevel: 'H', scale: 8 })

const { copy, isSupported, copied } = useClipboard()

const visible = ref(false)

async function copyUrl() {
  try {
    if (isSupported) {
      await copy(location.value.href!)
      toast.add({
        summary: 'Link copied to clipboard',
        life: 5000,
        severity: 'success',
      })
    }
  }
  catch (ex) {
    toast.add({
      summary: 'Failed to copy',
      life: 5000,
      severity: 'error',
    })
  }
}

async function toggle() {
  visible.value = !visible.value

  if (visible.value) {
    copyUrl()
  }
}

defineExpose({
  toggle,
})
</script>

<template>
  <p-dialog
    v-model:visible="visible"
    modal
    dismissable-mask
    header="Share game"
  >
    <div class="share-dialog">
      <div class="link-wrapper">
        <a :href="location.href" class="link" target="_blank">Invite link</a>
        <p-button
          v-if="isSupported"
          :icon="copied ? 'pi pi-check' : 'pi pi-copy'"
          :severity="copied ? 'success' : undefined"
          @click="copyUrl"
        />
      </div>

      <img :src="qrcode" alt="QR Code" class="qrcode">
    </div>
  </p-dialog>
</template>

<style scoped>
.share-dialog {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.link-wrapper {
  display: flex;
  gap: 0.5rem;
}

.link {
  flex-grow: 1;
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border: 1px solid var(--p-button-outlined-secondary-border-color);
  border-radius: var(--p-button-border-radius);
}

.qrcode {
  max-width: 30ch;
  border: 1px solid var(--p-button-outlined-secondary-border-color);
  border-radius: var(--p-button-border-radius);
}
</style>
