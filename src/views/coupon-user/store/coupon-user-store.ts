import { defineStore } from 'pinia'
import { useTableHelper } from '@/components/base/table/table-helper'
import { useDialogHelper } from '@/components/base/dialog/dialog-helper'
import { useQueryHelper } from '@/components/base/query/query-helper'
import type { CouponUserInput, CouponUserSpec } from '@/apis/__generated/model/static'
import { api } from '@/utils/api-instance'
import { ref } from 'vue'

export const useCouponUserStore = defineStore('couponUser', () => {
  const initQuery: CouponUserSpec = {}
  const initForm: CouponUserInput = { receiveType: 'GIFT', status: 'UNUSED' }
  const tableHelper = useTableHelper(
    api.couponUserController.query,
    api.couponUserController,
    initQuery
  )
  const dialogHelper = useDialogHelper()
  const queryHelper = useQueryHelper<CouponUserSpec>(initQuery)
  const updateForm = ref<CouponUserInput>({ ...initForm })
  const createForm = ref<CouponUserInput>({ ...initForm })
  return { ...tableHelper, ...dialogHelper, ...queryHelper, updateForm, createForm, initForm }
})
