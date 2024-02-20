import { defineStore } from 'pinia'
import { useTableHelper } from '@/components/base/table/table-helper'
import { useDialogHelper } from '@/components/base/dialog/dialog-helper'
import { useQueryHelper } from '@/components/base/query/query-helper'
import type { ProductOrderSpec } from '@/apis/__generated/model/static'
import { api } from '@/utils/api-instance'

export const useProductOrderStore = defineStore('productOrder', () => {
  const initQuery: ProductOrderSpec = {
    items: { productSku: {} },
    address: {},
    payment: {},
    creator: {}
  }
  const tableHelper = useTableHelper(
    api.productOrderController.query,
    api.productOrderController,
    initQuery
  )
  const dialogHelper = useDialogHelper()
  const queryHelper = useQueryHelper<ProductOrderSpec>(initQuery)
  return { ...tableHelper, ...dialogHelper, ...queryHelper }
})
