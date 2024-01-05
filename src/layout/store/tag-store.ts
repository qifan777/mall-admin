import router from '@/router'
import { defineStore, storeToRefs } from 'pinia'
import { computed, onMounted, ref } from 'vue'
import type { RouteLocationPathRaw } from 'vue-router'
import type { MenuDto } from '@/apis/__generated/model/dto'
import { useHomeStore } from '@/stores/home-store'
import { DictConstants } from '@/typings/dict-constants'
export type TagMenu = Pick<
  MenuDto['MenuRepository/COMPLEX_FETCHER'],
  'id' | 'name' | 'menuType' | 'icon' | 'path'
> & {
  reloadKey: number
}

export const useTagStore = defineStore('tags', () => {
  const { menuList } = storeToRefs(useHomeStore())

  const activeTag = ref<TagMenu>({
    id: '',
    menuType: '',
    name: '',
    path: '',
    reloadKey: 0
  })
  const tags = ref<TagMenu[]>([])
  const show = computed(() => tags.value.length > 0)
  const closeTags = (index: number) => {
    const delItem = tags.value[index]
    tags.value.splice(index, 1)
    const item = tags.value[index] ? tags.value[index] : tags.value[index - 1]
    if (item) {
      delItem.id === activeTag.value.id && openMenu(item.path)
    } else {
      router.push('/')
    }
  }
  const openMenu = (route: string | RouteLocationPathRaw) => {
    let path = ''
    if (typeof route == 'string') {
      path = route
    } else if (route.path) {
      path = route.path
    }
    const menu = pushTag(path)
    if (menu.menuType === DictConstants.MenuType.DIRECTORY) {
      return
    } else if (menu.menuType === DictConstants.MenuType.MENU_ITEM) {
      router.push(route)
    }
  }
  const closeAll = () => {
    tags.value = []
    router.push('/')
  }
  const closeOther = () => {
    tags.value = [activeTag.value]
  }
  const pushTagByMenu = (menu: TagMenu) => {
    const currentIndex = tags.value.findIndex((item) => {
      return item.path === menu.path
    })
    activeTag.value = menu
    if (currentIndex === -1) {
      tags.value.push(menu)
    }
    return menu
  }
  const pushTag = (path: string) => {
    const menu = menuList.value.filter((value) => value.path === path)[0]
    return pushTagByMenu(menu)
  }
  const refresh = () => {
    activeTag.value.reloadKey++
  }

  return {
    activeTag,
    tags,
    show,
    closeTags,
    closeAll,
    closeOther,
    openMenu,
    refresh,
    pushTag
  }
})
