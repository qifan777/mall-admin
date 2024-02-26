import { defineStore } from 'pinia'
import { useTableHelper } from '@/components/base/table/table-helper'
import { useDialogHelper } from '@/components/base/dialog/dialog-helper'
import { useQueryHelper } from '@/components/base/query/query-helper'
import type { UserInput, UserSpec } from '@/apis/__generated/model/static'
import { api } from '@/utils/api-instance'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const initQuery: UserSpec = {}
  const initForm: UserInput = { roleIds: [], password: '', phone: '' }
  const tableHelper = useTableHelper(api.userController.query, api.userController, initQuery)
  const dialogHelper = useDialogHelper()
  const queryHelper = useQueryHelper<UserSpec>(initQuery)
  const updateForm = ref<UserInput>({ ...initForm })
  const createForm = ref<UserInput>({ ...initForm })
  return { ...tableHelper, ...dialogHelper, ...queryHelper, updateForm, createForm, initForm }
})
export const userQueryOptions = async (keyword: string, id: string) => {
  return (await api.userController.query({ body: { query: { phone: keyword, id } } })).content
}
export const userLabelProp = (row: { nickname?: string; phone: string }) => {
  if (row.nickname) {
    return `${row.nickname}(${row.phone})`
  } else {
    return row.phone
  }
}
