import { defineStore } from 'pinia'
import { useTableHelper } from '@/components/base/table/table-helper'
import { useDialogHelper } from '@/components/base/dialog/dialog-helper'
import { useQueryHelper } from '@/components/base/query/query-helper'
import type { ProductCategoryInput, ProductCategorySpec } from '@/apis/__generated/model/static'
import { api } from '@/utils/api-instance'
import { ref } from 'vue'

export const useProductCategoryStore = defineStore('productCategory', () => {
  const initQuery: ProductCategorySpec = {}
  const initForm: ProductCategoryInput = { description: '', image: '', name: '' }
  const tableHelper = useTableHelper(
    api.productCategoryController.query,
    api.productCategoryController,
    initQuery
  )
  const dialogHelper = useDialogHelper()
  const queryHelper = useQueryHelper<ProductCategorySpec>(initQuery)
  const updateForm = ref<ProductCategoryInput>(initForm)
  const createForm = ref<ProductCategoryInput>(initForm)
  return { ...tableHelper, ...dialogHelper, ...queryHelper, updateForm, createForm, initForm }
})
