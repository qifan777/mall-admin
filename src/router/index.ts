import { createRouter, createWebHistory } from 'vue-router'
import RegisterView from '@/views/login/register-view.vue'
import LoginView from '@/views/login/login-view.vue'
import DictView from '@/views/dict/dict-view.vue'
import RoleView from '@/views/role/role-view.vue'
import MenuView from '@/views/menu/menu-view.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/user', component: () => import('@/views/user/user-view.vue') },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/dict',
      name: 'dict',
      component: DictView
    },
    {
      path: '/role',
      name: 'role',
      component: RoleView
    },
    {
      path: '/menu',
      name: 'menu',
      component: MenuView
    }
  ]
})

export default router
