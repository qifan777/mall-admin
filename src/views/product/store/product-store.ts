import { defineStore } from 'pinia'
import { useTableHelper } from '@/components/base/table/table-helper'
import { useDialogHelper } from '@/components/base/dialog/dialog-helper'
import { useQueryHelper } from '@/components/base/query/query-helper'
import type { ProductInput, ProductSpec } from '@/apis/__generated/model/static'
import { api } from '@/utils/api-instance'
import { ref } from 'vue'
import type { ProductDto } from '@/apis/__generated/model/dto'

export const useProductStore = defineStore('product', () => {
  const initQuery: ProductSpec = {}
  const initForm: ProductInput = {
    categoryId: '',
    stock: 0,
    brand: '',
    description: '',
    features: '',
    image: '',
    name: '',
    price: 0,
    specs: '',
    tags: '',
    attributes: [],
    skuList: []
  }
  const tableHelper = useTableHelper(api.productController.query, api.productController, initQuery)
  const dialogHelper = useDialogHelper()
  const queryHelper = useQueryHelper<ProductSpec>(initQuery)
  const updateForm = ref<ProductInput>(initForm)
  const createForm = ref<ProductInput>(initForm)
  return { ...tableHelper, ...dialogHelper, ...queryHelper, updateForm, createForm, initForm }
})
