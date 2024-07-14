<script setup lang="ts">
import type { GlobalComponents } from 'vue'
import type { ComponentExposed } from 'vue-component-type-helpers'

import { useGame, useUser } from '@/composables/useGame'
import { useTheme } from '@/composables/useTheme'

const { themeIcon, toggleTheme } = useTheme()

const shareDialogEl = ref<ComponentExposed<GlobalComponents['ShareDialog']>>()
const settingsDialogEl = ref<ComponentExposed<GlobalComponents['SettingsDialog']>>()

const userSettingsEl = ref<InstanceType<GlobalComponents['Popover']>>()

const { params: { id: routerIds } } = useRoute()
const gameId = Array.isArray(routerIds) ? routerIds.at(0)! : routerIds!

const user = useUser()
const { gameName, showResult, voteSystemName, state, reset } = useGame(gameId, user)

const groupedView = ref(false)
</script>

<template>
  <section class="main">
    <section class="wrapper">
      <template v-if="!(gameName && voteSystemName)">
        <i class="pi pi-spin pi-spinner" style="font-size: 3em" />
      </template>
      <template v-else>
        <p-card>
          <template #content>
            <div class="header">
              <p-button icon="pi pi-home" text @click="$router.push({ name: 'hello' })" />
              <b style="font-size: 1.25em">{{ gameName }}</b>
              <div style="flex-grow: 1" />
              <p-button icon="pi pi-user-edit" text @click="(e) => userSettingsEl?.toggle(e)" />
              <p-button icon="pi pi-cog" text @click="settingsDialogEl?.toggle()" />
              <p-button icon="pi pi-share-alt" text @click="shareDialogEl?.toggle()" />
              <p-button :icon="themeIcon" text @click="toggleTheme" />
            </div>
          </template>
        </p-card>
        <p-card
          class="card-content"
          :pt="{
            body: { style: { flexGrow: 1 } },
            content: { style: { flexGrow: 1 } },
          }"
        >
          <template #content>
            <div class="content">
              <div class="result">
                <transition name="slide" mode="out-in">
                  <game-result-grouped v-if="groupedView" :result="state" :vote-system-name="voteSystemName" :show="showResult" />
                  <game-result v-else :result="state" :show="showResult" />
                </transition>
              </div>
            </div>
          </template>
          <template #footer>
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
          </template>
        </p-card>
        <p-card>
          <template #content>
            <cards-selector
              v-model:vote="user.vote"
              :vote-system-name="voteSystemName"
              :class="{ 'p-disabled': showResult }"
            />
          </template>
        </p-card>
      </template>
    </section>
    <p-popover
      ref="userSettingsEl"
      :pt="{ content: { style: { padding: '0.5rem' } } }"
    >
      <user-settings v-model:username="user.name" />
    </p-popover>
    <share-dialog ref="shareDialogEl" />
    <settings-dialog
      ref="settingsDialogEl"
      v-model:game-name="gameName"
      v-model:vote-system-name="voteSystemName"
    />
  </section>
</template>

<style scoped>
.main {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
}

.header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.content {
  min-height: 40vh;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

@media only screen and (orientation : portrait) {
  .card-content {
    flex-grow: 1;
  }
}

.result {
  overflow: hidden;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.actions {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
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
