import { defineStore } from 'pinia'
import { ref } from 'vue'
import { User } from '@/utils/myType'
import { UserControllerService } from '../../../generated/services/UserControllerService'
import Access_Enum from '@/access/accessEnum'

export const useUserStore = defineStore('user', () => {
  //state
  const user = ref({
    userName: '',
    createTime: '',
    id: -1,
    updateTime: '',
    userAvatar: '',
    userProfile: '',
    userRole: Access_Enum.NOT_LOGIN
  })

  //actions
  const setUser = (newUser: User) => {
    user.value = newUser
  }

  const clearUser = () => {
    user.value = {
      userName: '',
      createTime: '',
      id: -1,
      updateTime: '',
      userAvatar: '',
      userProfile: '',
      userRole: Access_Enum.NOT_LOGIN
    }
  }

  // 从远程获取登录用户信息
  const getUserInfo = async () => {
    const res = await UserControllerService.getLoginUserUsingGet()
    if (res.code === 0) {
      // 用户已登录
      setUser(res.data as User)
    } else {
      // 用户未登录
      setUser({ ...user.value, userRole: Access_Enum.NOT_LOGIN } as User)
      // console.log('用户未登录')
    }
  }

  //getters

  return {
    user,
    setUser,
    clearUser,
    getUserInfo
  }
})
