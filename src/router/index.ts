import { createRouter, createWebHistory } from 'vue-router'

import { routes } from './routes'
import { useUserStore } from '@/store/modules/user'
import checkAccess from '@/access/checkAccess'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: routes
})

//路由鉴权 --去哪些页面之前要判断是否需要权限
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  const { user, token } = userStore
  // //是否去需要管理权限的页面
  // if (to.meta.access === 'Admin') {
  //   //是否有权限
  //   if (user?.userRole !== 'Admin') {
  //     next('/noAuth')
  //     return
  //   }
  // }

  // 没有权限
  if (!checkAccess(user, to.meta.access as string)) {
    next('/noAuth')
    return
  }
  //是否有token
  if (!token) {
    next('/login')
    return
  }
  next()
})

export default router
