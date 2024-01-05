import { defineStore } from 'pinia'
import { useTableHelper } from '@/components/base/table/table-helper'
import { useDialogHelper } from '@/components/base/dialog/dialog-helper'
import { useQueryHelper } from '@/components/base/query/query-helper'
import type { MenuInput, MenuSpec } from '@/apis/__generated/model/static'
import { api } from '@/utils/api-instance'
import { ref } from 'vue'
import type { MenuTreeDto } from '@/typings'

export const useMenuStore = defineStore('menu', () => {
  const initQuery: MenuSpec = {}
  const initForm: MenuInput = { menuType: '', name: '', path: '' }
  const tableHelper = useTableHelper(api.menuController.query, api.menuController, initQuery)
  const dialogHelper = useDialogHelper()
  const queryHelper = useQueryHelper<MenuSpec>(initQuery)
  const updateForm = ref<MenuInput>(initForm)
  const createForm = ref<MenuInput>(initForm)
  const menuTreeList = ref<MenuTreeDto[]>([])
  const reloadMenuTree = () => {
    api.menuController.queryMenuTree().then((res) => {
      menuTreeList.value = res
    })
  }
  return {
    ...tableHelper,
    ...dialogHelper,
    ...queryHelper,
    updateForm,
    createForm,
    initForm,
    menuTreeList,
    reloadMenuTree
  }
})
