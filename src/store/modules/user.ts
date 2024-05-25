import { defineStore } from 'pinia'
import { ref } from 'vue'
import { User } from '@/utils/myType'

export const useUserStore = defineStore('user', () => {
  //state
  const token = '11123'
  const user = ref({
    userRole: 'admin',
    userName: '嘻嘻'
  })

  //actions
  const setUser = (newUser: User) => {
    user.value = { ...user.value, ...newUser }
  }

  //getters

  return {
    token,
    user,
    setUser
  }
})
