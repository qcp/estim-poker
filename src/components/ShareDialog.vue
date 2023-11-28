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
        detail: 'Link copied to clipboard',
        life: 5000,
        severity: 'success'
      })
    }
  } catch (ex) {
    toast.add({
      detail: 'Failed to copy',
      life: 5000,
      severity: 'error'
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
  toggle
})
</script>

<template>
  <p-dialog
    v-model:visible="visible"
    modal
    dismissable-mask
    header="Share game"
    :pt="{
      root: { style: { 'max-width': '30ch' } },
      header: { style: 'padding: var(--inline-spacing)' },
      content: { style: 'padding: unset' }
    }"
  >
    <div class="share-dialog">
      <div class="link-wrapper">
        <a :href="location.href" class="link">Invite link</a>
        <p-button
          v-if="isSupported"
          :icon="copied ? 'pi pi-check' : 'pi pi-copy'"
          :severity="copied ? 'success' : undefined"
          @click="copyUrl"
        />
      </div>

      <img :src="qrcode" alt="QR Code" class="qrcode" />
    </div>
  </p-dialog>
</template>

<style scoped>
.share-dialog {
  display: flex;
  flex-direction: column;
  gap: var(--inline-spacing);
  padding: var(--content-padding);
  padding-top: var(--inline-spacing);
}
.link-wrapper {
  display: flex;
  gap: var(--inline-spacing);
}
.link {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  padding: var(--inline-spacing);
  border: 1px solid var(--surface-border);
  border-radius: var(--border-radius);
}
.qrcode {
  border: 1px solid var(--surface-border);
  border-radius: var(--border-radius);
}
</style>
