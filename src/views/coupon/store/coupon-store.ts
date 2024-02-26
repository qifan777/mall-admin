import { defineStore } from 'pinia'
import { useTableHelper } from '@/components/base/table/table-helper'
import { useDialogHelper } from '@/components/base/dialog/dialog-helper'
import { useQueryHelper } from '@/components/base/query/query-helper'
import type { CouponInput, CouponSpec } from '@/apis/__generated/model/static'
import { api } from '@/utils/api-instance'
import { ref } from 'vue'

export const useCouponStore = defineStore('coupon', () => {
  const initQuery: CouponSpec = {}
  const initForm: CouponInput = {
    effectiveDate: '',
    expirationDate: '',
    name: '',
    releasedQuantity: 0,
    scope: 'GENERAL',
    thresholdAmount: 0,
    type: 'REDUCE'
  }
  const tableHelper = useTableHelper(api.couponController.query, api.couponController, initQuery)
  const dialogHelper = useDialogHelper()
  const queryHelper = useQueryHelper<CouponSpec>(initQuery)
  const updateForm = ref<CouponInput>({ ...initForm })
  const createForm = ref<CouponInput>({ ...initForm })
  return { ...tableHelper, ...dialogHelper, ...queryHelper, updateForm, createForm, initForm }
})
export const couponQueryOptions = async (keyword: string, id: string) => {
  return (await api.couponController.query({ body: { query: { name: keyword, id } } })).content
}
