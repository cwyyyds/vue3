import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import layout from '../views/Layout/index.vue'
import login from '../views/Login/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: login,
  },
  {
    path: '/',
    name: 'layout',
    component: layout,
    redirect: '/HomePage',
    children: [
      {
        path: '/HomePage',
        name: 'homePage',
        component: () => import('@/views/HomePage/index.vue'),
        meta: { title: '首页', icon: 'dashboard' },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
