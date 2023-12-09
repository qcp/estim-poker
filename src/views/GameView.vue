<script setup lang="ts">
import type { GlobalComponents } from 'vue'
import type { ComponentExposed } from 'vue-component-type-helpers'

import { useGame, useUser } from '@/composables/useGame'

const shareDialogEl = ref<ComponentExposed<GlobalComponents['ShareDialog']>>()
const settingsDialogEl = ref<ComponentExposed<GlobalComponents['SettingsDialog']>>()

const userSettingsEl = ref<InstanceType<GlobalComponents['OverlayPanel']>>()

const { params: { id: routerIds } } = useRoute()
const gameId = Array.isArray(routerIds) ? routerIds.at(0)! : routerIds!

const user = useUser()
const { gameName, showResult, voteSystemName, state, reset } = useGame(gameId, user)

const groupedView = ref(false)
</script>

<template>
  <section class="wrapper">
    <template v-if="!(gameName && voteSystemName)">
      <i class="pi pi-spin pi-spinner" style="font-size: 3em" />
    </template>
    <template v-else>
      <div class="p-card header">
        <p-button icon="pi pi-home" text @click="$router.push({ name: 'hello' })" />
        <b style="font-size: 1.25em">{{ gameName }}</b>
        <div style="flex-grow: 1" />
        <p-button icon="pi pi-user-edit" text @click="(e) => userSettingsEl?.toggle(e)" />
        <p-button icon="pi pi-cog" text @click="settingsDialogEl?.toggle()" />
        <p-button icon="pi pi-share-alt" text @click="shareDialogEl?.toggle()" />
      </div>
      <div class="p-card content">
        <div style="flex-grow: 1;" />

        <transition name="slide" mode="out-in">
          <game-result-grouped v-if="groupedView" :result="state" :vote-system-name="voteSystemName" :show="showResult" />
          <game-result v-else :result="state" :show="showResult" />
        </transition>

        <div style="flex-grow: 1;" />

        <div class="actions">
          <p-button
            v-tooltip.top="groupedView ? 'Show each vote' : 'Show grouped votes'"
            :icon="groupedView ? 'pi pi-table' : 'pi pi-th-large'"
            severity="secondary"
            text
            @click="() => groupedView = !groupedView"
          />
          <p-button
            :icon="showResult ? 'pi pi-eye-slash' : 'pi pi-eye'"
            :label="showResult ? 'Hide result' : 'Show result'"
            text
            style="width: 20ch"
            @click="() => (showResult = !showResult)"
          />
          <p-button
            v-tooltip.top="'Reset votes'"
            icon="pi pi-refresh"
            severity="danger"
            text
            @click="reset"
          />
        </div>
      </div>
      <div class="p-card selector">
        <cards-selector
          v-model:vote="user.vote"
          :vote-system-name="voteSystemName"
          :class="{ 'p-disabled': showResult }"
        />
      </div>

      <p-overlay-panel ref="userSettingsEl">
        <user-settings v-model:username="user.name" />
      </p-overlay-panel>
      <share-dialog ref="shareDialogEl" />
      <settings-dialog
        ref="settingsDialogEl"
        v-model:game-name="gameName"
        v-model:vote-system-name="voteSystemName"
      />
    </template>
  </section>
</template>

<style scoped>
.wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--content-padding);
  margin: var(--content-padding);
  justify-content: center;
}
.header {
  display: flex;
  align-items: center;
  gap: var(--inline-spacing);
  padding: var(--inline-spacing);
}
.content {
  min-height: 50vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--inline-spacing);
  padding: var(--content-padding);
}

.selector {
  padding: var(--content-padding);
}
.actions {
  display: flex;
  gap: var(--inline-spacing);
  align-items: center;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.25s ease-out;
}

.slide-enter-from {
  opacity: 0;
  translate: 10ch;
}

.slide-leave-to {
  opacity: 0;
  translate: -10ch;
}
</style>
