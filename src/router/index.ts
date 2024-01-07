import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{ path: '/user', component: () => import('@/views/user/user-view.vue') }]
})

export default router
