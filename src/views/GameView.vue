<script setup lang="ts">
import type { GlobalComponents } from 'vue'
import type { ComponentExposed } from 'vue-component-type-helpers'

import { useGame } from '@/composables/useGame'
import { useTheme } from '@/composables/useTheme'

const isMobile = useMediaQuery('only screen and (orientation:portrait) and (pointer:coarse)')

const { themeIcon, toggleTheme } = useTheme()

const shareDialogEl = ref<ComponentExposed<GlobalComponents['ShareDialog']>>()
const settingsDialogEl = ref<ComponentExposed<GlobalComponents['SettingsDialog']>>()

const userSettingsEl = ref<InstanceType<GlobalComponents['Popover']>>()

const { params: { id: routerIds } } = useRoute()
const gameId = Array.isArray(routerIds) ? routerIds.at(0)! : routerIds!

const { status, game, user, toggleResults, resetResults, updateGame, changeName, changeVote } = useGame(gameId)

const groupedView = ref(false)

const reloadPage = () => window.location.reload()
</script>

<template>
  <section v-if="game" class="main">
    <p-card>
      <template #content>
        <div class="header">
          <p-button icon="pi pi-home" text @click="$router.push({ name: 'hello' })" />
          <b class="game-label">{{ game.name }}</b>
          <p-button icon="pi pi-user-edit" text @click="(e) => userSettingsEl?.toggle(e)" />
          <p-button icon="pi pi-cog" text @click="settingsDialogEl?.toggle()" />
          <p-button icon="pi pi-share-alt" text @click="shareDialogEl?.toggle()" />
          <p-button :icon="themeIcon" text @click="toggleTheme" />
        </div>
      </template>
    </p-card>
    <p-card
      :pt="{
        root: { style: { flexGrow: isMobile ? 1 : 0 } },
        body: { style: { flexGrow: 1 } },
        content: { style: { flexGrow: 1, display: 'flex', flexDirection: 'column' } },
      }"
    >
      <template #content>
        <div class="result">
          <transition name="slide" mode="out-in">
            <game-result-grouped v-if="groupedView" :result="game.users" :vote-system-name="game.voteSystem" :show="game.showResults" />
            <game-result v-else :result="game.users" :show="game.showResults" />
          </transition>
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
            :icon="game.showResults ? 'pi pi-eye-slash' : 'pi pi-eye'"
            :label="game.showResults ? 'Hide result' : 'Show result'"
            text
            style="width: 20ch;"
            @click="toggleResults"
          />
          <p-button
            v-tooltip.top="'Reset votes'"
            icon="pi pi-refresh"
            severity="danger"
            text
            @click="resetResults"
          />
        </div>
      </template>
    </p-card>
    <p-card>
      <template #content>
        <cards-selector
          :vote="user.vote"
          :vote-system-name="game.voteSystem"
          :disabled="game.showResults"
          @update:vote="changeVote"
        />
      </template>
    </p-card>

    <p-popover ref="userSettingsEl">
      <user-settings
        :username="user.name"
        @update:username="changeName"
      />
    </p-popover>
    <share-dialog ref="shareDialogEl" />
    <settings-dialog
      ref="settingsDialogEl"
      :name="game.name"
      :vote-system="game.voteSystem"
      @save="updateGame"
    />
  </section>
  <section v-else-if="status !== 'CLOSED'" class="loading">
    <i class="pi pi-spin pi-spinner" style="font-size: 3em;" />
  </section>
  <section v-else-if="status === 'CLOSED'" class="main">
    <p-card>
      <template #content>
        <p-message severity="error">
          Something went wrong...
        </p-message>
      </template>
      <template #footer>
        <div class="actions">
          <p-button
            label="Reload page"
            severity="secondary"
            @click="reloadPage"
          />
          <p-button
            label="Back to menu"
            severity="secondary"
            @click="$router.push({ name: 'hello' })"
          />
        </div>
      </template>
    </p-card>
  </section>
</template>

<style scoped>
.main {
  flex-grow: 1;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
}

.loading {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.header {
  display: flex;
  align-items: center;
  gap: 0.2rem;
}

.game-label {
  width: 0;
  flex: 1 1 0px;
  font-size: 1.25em;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.result {
  min-height: 40vh;
  flex-grow: 1;
  overflow: hidden;
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
