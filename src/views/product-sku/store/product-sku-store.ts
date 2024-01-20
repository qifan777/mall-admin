import { defineStore } from 'pinia'
import { useTableHelper } from '@/components/base/table/table-helper'
import { useDialogHelper } from '@/components/base/dialog/dialog-helper'
import { useQueryHelper } from '@/components/base/query/query-helper'
import type { ProductSkuInput, ProductSkuSpec } from '@/apis/__generated/model/static'
import { api } from '@/utils/api-instance'
import { ref } from 'vue'

export const useProductSkuStore = defineStore('productSku', () => {
  const initQuery: ProductSkuSpec = {}
  const initForm: ProductSkuInput = {
    cover: '',
    description: '',
    name: '',
    price: 0,
    stock: 0,
    values: []
  }
  const tableHelper = useTableHelper(
    api.productSkuController.query,
    api.productSkuController,
    initQuery
  )
  const dialogHelper = useDialogHelper()
  const queryHelper = useQueryHelper<ProductSkuSpec>(initQuery)
  const updateForm = ref<ProductSkuInput>({ ...initForm })
  const createForm = ref<ProductSkuInput>({ ...initForm })
  return { ...tableHelper, ...dialogHelper, ...queryHelper, updateForm, createForm, initForm }
})
