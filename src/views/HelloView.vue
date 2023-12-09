<script setup lang="ts">
import { createGame, useGamesHistory } from '@/composables/useGame'
import PockerIcon from '@/icons/PokerIcon.vue'

const isPortrait = useMediaQuery('(orientation: portrait)')
const { history, remove } = useGamesHistory()
const router = useRouter()

function goToGame(id: string) {
  router.push({ name: 'game', params: { id } })
}

async function createNewGame() {
  const newGame = await createGame(getRandomGameName(), 'shark')
  goToGame(newGame.id)
}
</script>

<template>
  <section class="main">
    <section class="wrapper">
      <p-card
        :pt="{
          content: {
            style: {
              display: 'grid',
              [isPortrait ? 'grid-template-rows' : 'grid-template-columns']: '1fr auto 1fr',
            },
          },
        }"
      >
        <template #content>
          <div class="panel">
            <pocker-icon class="icon-pocker" />
            <p-button @click="createNewGame">
              Create new game
            </p-button>
          </div>
          <p-divider :layout="isPortrait ? 'horizontal' : 'vertical'" class="hidden md:flex">
            <b>OR</b>
          </p-divider>
          <template v-if="history.length > 0">
            <div class="panel">
              <h4 style="margin: 0">
                Join the old one
              </h4>
              <div class="game-list">
                <div v-for="{ id, name } in history" :key="id" class="game-item">
                  <i class="arrow pi pi-angle-double-right" />
                  <span class="text" @click="goToGame(id)">{{ name }}</span>
                  <i class="dell pi pi-trash" style="color: var(--red-500)" @click="remove(id)" />
                </div>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="panel">
              Your game history <br>
              will be here...
            </div>
          </template>
        </template>
      </p-card>
    </section>

    <stack-footer />
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
  align-items: center;
  justify-content: center;
}
.panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--content-padding);
}

.game-list {
  display: flex;
  flex-direction: column;
  gap: var(--inline-spacing);
}
.game-item {
  display: flex;
  gap: var(--inline-spacing);
  align-items: center;

  cursor: pointer;
}
.game-item .pi {
  transition: all 0.5s;
}
.game-item .dell {
  opacity: 0;
}
.game-item:hover .arrow {
  color: var(--primary-500);
  translate: calc(var(--inline-spacing) / 2) 0;
}
.game-item:hover .dell {
  opacity: 1;
}
.game-item .text:hover {
  text-decoration: underline;
}

.icon-pocker {
  font-size: 5em;
  color: var(--text-color);
}
.icon-pocker :deep(.suit) {
  color: var(--primary-500);
}
</style>
