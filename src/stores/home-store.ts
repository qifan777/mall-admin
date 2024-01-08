import { defineStore } from 'pinia'
import { onMounted, ref } from 'vue'
import type { UserDto } from '@/apis/__generated/model/dto'
import { api } from '@/utils/api-instance'

export const useHomeStore = defineStore('home', () => {
  const userInfo = ref<UserDto['UserRepository/COMPLEX_FETCHER']>({
    createdTime: '',
    editedTime: '',
    id: '',
    nickname: '',
    password: '',
    phone: ''
  })
  const getUserInfo = async () => {
    userInfo.value = await api.userController.getUserInfo()
  }
  const init = async () => {
    await getUserInfo()
  }

  onMounted(async () => {
    await init()
  })
  return { userInfo, getUserInfo, init }
})
