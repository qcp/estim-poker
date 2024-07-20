<script setup lang="ts">
import { useGamesHistory } from '@/composables/useGame'

const { history, remove } = useGamesHistory()
const router = useRouter()

function getLink(id: string) {
  return `${window.location.href}game/${id}`
}

function goToGame(id: string) {
  router.push({ name: 'game', params: { id } })
}
</script>

<template>
  <p-card v-if="history.length > 0">
    <template #content>
      <h3 style="margin: 0; margin-bottom: 0.5em;">
        Previous games:
      </h3>
      <div class="game-list">
        <div v-for="{ id, name } in history" :key="id" class="game-item">
          <i class="arrow pi pi-angle-double-right" />
          <a class="text" :href="getLink(id)" @click.prevent="goToGame(id)">{{ name }}</a>
          <i class="dell pi pi-trash" style="color: var(--p-red-500);" @click="remove(id)" />
        </div>
      </div>
    </template>
  </p-card>
</template>

<style scoped>
.game-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.game-item {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  cursor: pointer;
}

.game-item .text {
  color: inherit;
  text-decoration: none;
}

.game-item .pi {
  transition: all 0.5s;
}

.game-item .dell {
  opacity: 0;
}

.game-item:hover .arrow {
  color: var(--p-primary-500);
  translate: calc(0.5rem / 2) 0;
}

.game-item:hover .dell {
  opacity: 1;
}

.game-item .text:hover {
  text-decoration: underline;
}
</style>
