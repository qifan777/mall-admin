import { defineStore } from 'pinia'
import { onMounted, ref } from 'vue'
import type { MenuDto, UserDto } from '@/apis/__generated/model/dto'
import { api } from '@/utils/api-instance'
import type { TagMenu } from '@/layout/store/tag-store'

export const useHomeStore = defineStore('home', () => {
  const userInfo = ref<UserDto['UserRepository/COMPLEX_FETCHER']>({
    createdTime: '',
    editedTime: '',
    id: '',
    nickname: '',
    password: '',
    phone: '',
    rolesView: []
  })
  const menuTrees = ref<MenuDto['MenuRepository/MENU_TREE_FETCHER'][]>([])
  const menuList = ref<TagMenu[]>([])
  const getUserInfo = async () => {
    userInfo.value = await api.userController.userInfo()
  }
  const init = async () => {
    await getUserInfo()
    menuList.value = (await api.userController.getUserMenus()).map((menu) => {
      return { ...menu, reloadKey: 0 }
    })
    menuTrees.value = await api.userController.getUserMenusTree()
  }

  onMounted(async () => {
    await init()
  })
  return { userInfo, menuList, menuTrees, getUserInfo, init }
})
