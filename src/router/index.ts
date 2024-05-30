import { createRouter, createWebHistory } from 'vue-router'

import { routes } from './routes'
import { useUserStore } from '@/store/modules/user'
import checkAccess from '@/access/checkAccess'
import { storeToRefs } from 'pinia'
import Access_Enum from '@/access/accessEnum'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: routes
})

//路由鉴权 --去哪些页面之前要判断是否需要权限
router.beforeEach(async (to, from, next) => {
  // 在内部访问状态时再调用，不要在外部调用，否则会报错
  const userStore = useUserStore()
  const { user } = storeToRefs(userStore)
  // 自动登录
  const loginUser = user.value
  if (!loginUser || loginUser.userRole === Access_Enum.NOT_LOGIN) {
    await userStore.getUserInfo()
  }

  const needAccess: string =
    (to.meta?.access as string) ?? Access_Enum.NOT_LOGIN
  // 要跳转的页面需要登录
  if (needAccess !== Access_Enum.NOT_LOGIN) {
    if (user.value.userRole === Access_Enum.NOT_LOGIN) {
      // console.log(user.value.userRole, needAccess)
      next('/user/login')
      return
    }
    // 已登录但是权限不足
    if (!checkAccess(user.value, needAccess)) {
      next('/noAuth')
      return
    }
  }

  next()
  return
})

export default router
