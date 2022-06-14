import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView/IndexView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
