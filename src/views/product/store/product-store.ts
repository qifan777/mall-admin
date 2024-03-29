import { defineStore } from 'pinia'
import { useTableHelper } from '@/components/base/table/table-helper'
import { useDialogHelper } from '@/components/base/dialog/dialog-helper'
import { useQueryHelper } from '@/components/base/query/query-helper'
import type { ProductInput, ProductSpec } from '@/apis/__generated/model/static'
import { api } from '@/utils/api-instance'
import { ref } from 'vue'
export const productQueryOption = async (keyword: string, id: string) => {
  return (
    await api.productController.query({
      body: { query: { name: keyword, id } }
    })
  ).content
}

export const useProductStore = defineStore('product', () => {
  const initQuery: ProductSpec = {}
  const initForm: ProductInput = {
    categoryId: '',
    attributes: [],
    brand: '',
    cover: '',
    description: '',
    name: '',
    price: 0,
    specifications: [],
    stock: 0,
    tags: []
  }
  const tableHelper = useTableHelper(api.productController.query, api.productController, initQuery)
  const dialogHelper = useDialogHelper()
  const queryHelper = useQueryHelper<ProductSpec>(initQuery)
  const updateForm = ref<ProductInput>({ ...initForm })
  const createForm = ref<ProductInput>({ ...initForm })
  return { ...tableHelper, ...dialogHelper, ...queryHelper, updateForm, createForm, initForm }
})
