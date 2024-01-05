import { createRouter, createWebHistory } from 'vue-router'
import DictView from '@/views/dict/dict-view.vue'
import UserView from '@/views/user/user-view.vue'
import RoleView from '@/views/role/role-view.vue'
import MenuView from '@/views/menu/menu-view.vue'
import LoginView from '@/views/login/login-view.vue'
import RegisterView from '@/views/login/register-view.vue'
import Layout from '@/layout/layout-view.vue'

const router = createRouter({
  history: createWebHistory('mall-admin'),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: Layout,
      children: [
        { path: 'user', name: 'user', component: UserView },
        { path: 'role', name: 'role', component: RoleView },
        { path: 'menu', name: 'menu', component: MenuView },
        { path: 'dict', name: 'dict', component: DictView },
        {
          path: 'product',
          name: 'product',
          component: () => import('@/views/product/product-view.vue')
        },
        {
          path: 'product-category',
          name: 'product-category',
          component: () => import('@/views/product-category/product-category-view.vue')
        },
        {
          path: 'coupon',
          name: 'coupon',
          component: () => import('@/views/coupon/coupon-view.vue')
        },
        {
          path: 'coupon-user',
          name: 'coupon-user',
          component: () => import('@/views/coupon-user/coupon-user-view.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    }
  ]
})

export default router
