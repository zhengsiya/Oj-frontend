// import HomeView from '@/views/HomeView.vue'
import NotFoundPage from '@/views/NotFoundPage.vue'
// import AdminPage from '@/views/AdminPage.vue'
import UserLayout from '@/views/user/UserLayout.vue'
import ScanQuestions from '@/views/questions/ScanQuestionsView.vue'

import { RouteRecordRaw } from 'vue-router'
import DoQuestionView from '@/views/questions/DoQuestionView.vue'
import Access_Enum from '@/access/accessEnum'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/questions'
  },
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
  {
    path: '/questions/add',
    name: '编辑题目',
    component: () => import('@/views/questions/AddQuestionView.vue'),
    meta: {
      access: 'admin',
      hideInMenu: true
    }
  },
  {
    path: '/questions/manage',
    name: '题目管理',
    component: () => import('@/views/questions/ManageQuestionView.vue'),
    meta: {
      access: 'admin'
      // hideInMenu: true
    }
  },
  { path: '/questions', name: '浏览题目', component: ScanQuestions },
  {
    path: '/questions/submitted',
    name: '已提交题目',
    component: () => import('@/views/questions/ViewSubmittedQ.vue'),
    meta: {
      access: Access_Enum.USER
    }
  },
  {
    path: '/questions/solve/:id', //传参是题目id，说明做的是哪道题
    name: '在线做题',
    component: DoQuestionView,
    props: true,
    meta: { access: Access_Enum.USER, hideInMenu: true }
  },
  {
    path: '/about',
    name: '关于我的',
    component: () => import('@/views/AboutView.vue')
  },
  // {
  //   path: '/admin',
  //   name: '管理员可见',
  //   component: AdminPage,
  //   meta: {
  //     requiresAuth: true,
  //     access: 'admin'
  //   }
  // },
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
