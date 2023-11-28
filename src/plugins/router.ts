import { createRouter, createWebHashHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'hello',
      component: () => import('@/views/HelloView.vue')
    },
    {
      path: '/game/:id',
      name: 'game',
      component: () => import('@/views/GameView.vue')
    }
  ]
})
