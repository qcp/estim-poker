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
    <section class="wrapper">
      <div class="header">
        <h1 class="header-title">
          <span class="header-icon">
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 48 48">
              <g class="card" fill="none" stroke-linejoin="round" stroke-width="4" stroke="var(--p-text-color)">
                <path d="M42 4H12v40h30V4Z" />
                <path stroke-linecap="round" d="M4 11.79L12 10v34L4 11.79Z" clip-rule="evenodd" />
                <path stroke="var(--p-primary-color)" d="m27 18l-5 6l5 6l5-6l-5-6Z" />
                <path stroke-linecap="round" d="M18 10v4m18 20v4" />
              </g>
            </svg>
          </span>
          <span>Estim Pocker</span>
        </h1>
        <span class="header-description">Simple tool for estimate tasks in your team</span>
      </div>
      <div class="actions">
        <p-button icon="pi pi-github" text @click="openGithub" />
        <p-button size="large" raised label="Create game" @click="createNewGame" />
        <p-button :icon="themeIcon" text @click="toggleTheme" />
      </div>
      <game-history />
    </section>

    <pre>{{ 'made with 💚 by qcp' }}</pre>
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
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1em;
  padding: 1em;
}

.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.header-icon {
  vertical-align: middle;
}

.header-title {
  margin: 0;
  font-size: 4em;
  text-align: center;
  gap: 0.2rem;
}

.header-description {
  font-size: 1.5em;
  text-align: center;
}

.actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1em;
}
</style>
