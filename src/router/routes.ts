import HomeView from '@/views/HomeView.vue'
import { RouteRecordRaw } from 'vue-router'

export const routes: Array<RouteRecordRaw> = [
  { path: '/', name: '浏览题目', component: HomeView },
  {
    path: '/about',
    name: '关于我的',
    component: () => import('@/views/AboutView.vue')
  }
]
