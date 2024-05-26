import HomeView from '@/views/HomeView.vue'
import NotFoundPage from '@/views/NotFoundPage.vue'
import AdminPage from '@/views/AdminPage.vue'
import UserLayout from '@/views/user/UserLayout.vue'

import { RouteRecordRaw } from 'vue-router'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/user',
    name: '用户',
    redirect: '/user/login',
    component: UserLayout,
    children: [
      {
        path: 'login',
        name: '登录',
        component: () => import('@/views/user/LoginView.vue'),
        meta: { hideInMenu: true }
      },
      {
        path: 'register',
        name: '注册',
        component: () => import('@/views/user/RegisterView.vue'),
        meta: { hideInMenu: true }
      }
    ],
    meta: {
      hideInMenu: true
    }
  },
  { path: '/', name: '浏览题目', component: HomeView },

  {
    path: '/about',
    name: '关于我的',
    component: () => import('@/views/AboutView.vue')
  },
  {
    path: '/admin',
    name: '管理员可见',
    component: AdminPage,
    meta: {
      requiresAuth: true,
      access: 'admin'
    }
  },
  {
    path: '/noAuth',
    name: '无权限',
    component: () => import('@/views/NoAuth.vue'),
    meta: {
      hideInMenu: true
    }
  },
  {
    path: '/:catchAll(.*)',
    name: '页面不存在',
    component: NotFoundPage,
    meta: {
      hideInMenu: true
    }
  }
  // { path: '/:catchAll(.*)', component: NotFoundPage }
]
