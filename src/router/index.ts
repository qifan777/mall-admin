import { createRouter, createWebHistory } from 'vue-router'
import RegisterView from '@/views/login/register-view.vue'
import LoginView from '@/views/login/login-view.vue'
import DictView from '@/views/dict/dict-view.vue'
import RoleView from '@/views/role/role-view.vue'
import MenuView from '@/views/menu/menu-view.vue'
import LayoutView from '@/layout/layout-view.vue'
import { useHomeStore } from '@/stores/home-store'
import ProductCategoryView from '@/views/product-category/product-category-view.vue'
import ProductView from '@/views/product/product-view.vue'
import ProductSkuView from '@/views/product-sku/product-sku-view.vue'
import ProductOrderView from '@/views/product-order/product-order-view.vue'
import CouponView from '@/views/coupon/coupon-view.vue'
import CouponUserView from '@/views/coupon-user/coupon-user-view.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout-view',
      component: LayoutView,
      children: [
        { path: '/user', component: () => import('@/views/user/user-view.vue') },
        {
          path: '/role',
          name: 'role',
          component: RoleView
        },
        {
          path: '/menu',
          name: 'menu',
          component: MenuView
        },
        {
          path: '/product-category',
          name: 'product-category-view',
          component: ProductCategoryView
        },
        {
          path: '/product',
          name: 'product-view',
          component: ProductView
        },
        {
          path: '/product-sku',
          name: 'product-sku-view',
          component: ProductSkuView
        },
        {
          path: '/dict',
          name: 'dict',
          component: DictView
        },
        {
          path: '/product-order',
          name: 'product-order-view',
          component: ProductOrderView
        },
        {
          path: '/coupon',
          name: 'coupon-view',
          component: CouponView
        },
        {
          path: '/coupon-user',
          name: 'coupon-user-view',
          component: CouponUserView
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
// 添加路由拦截，在进入路由之前需要校验是否有该菜单的权限
const whiteList = ['/login', '/register', '/']
router.beforeEach(async (to, from, next) => {
  const homeStore = useHomeStore()
  if (
    whiteList.includes(to.path) ||
    (await homeStore.getMenuList()).findIndex((menu) => menu.path === to.path) >= 0
  ) {
    next()
  } else {
    return next('/')
  }
})
export default router
