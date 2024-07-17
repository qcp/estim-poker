<script setup lang="ts">
import { createGame } from '@/composables/useGame'
import { useTheme } from '@/composables/useTheme'

const { themeIcon, toggleTheme } = useTheme()

const router = useRouter()

function goToGame(id: string) {
  router.push({ name: 'game', params: { id } })
}

async function createNewGame() {
  const newGame = await createGame(getRandomGameName(), 'shark')
  goToGame(newGame.id)
}

function openGithub() {
  window.open('https://github.com/qcp/estim-poker', '_blank')
}
</script>

<template>
  <section class="main">
    <div style="flex-grow: 1;" />

    <hello-header />
    <section class="wrapper">
      <game-history />
      <div class="actions">
        <p-button icon="pi pi-github" text @click="openGithub" />
        <p-button size="large" raised label="Create game" @click="createNewGame" />
        <p-button :icon="themeIcon" text @click="toggleTheme" />
      </div>
    </section>

    <div style="flex-grow: 1;" />
    <pre>{{ 'made with 💚 by qcp' }}</pre>
  </section>
</template>

<style scoped>
.main {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3em;
  padding: 1em;
}

.wrapper {
  display: flex;
  flex-direction: column;
  gap: 3em;
}

.actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1em;
}
</style>
