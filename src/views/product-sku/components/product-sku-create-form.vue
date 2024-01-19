<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { reactive, ref, watch } from 'vue'
import { useProductSkuStore } from '../store/product-sku-store'
import { assertFormValidate, assertSuccess } from '@/utils/common'
import { api } from '@/utils/api-instance'
import FooterButton from '@/components/base/dialog/footer-button.vue'
import type { FormInstance, FormRules } from 'element-plus'
import { productQueryOption } from '@/views/product/store/product-store'
import RemoteSelect from '@/components/base/form/remote-select.vue'
import type { Attribute, ProductSkuInput } from '@/apis/__generated/model/static'
import ProductSku from './product-sku-create-table.vue'
import _ from 'lodash'

const productSkuStore = useProductSkuStore()
const { closeDialog, reloadTableData } = productSkuStore
const { createForm, dialogData } = storeToRefs(productSkuStore)
const createFormRef = ref<FormInstance>()
const rules = reactive<FormRules<typeof createForm>>({
  name: [{ required: true, message: '请输入Sku名称', trigger: 'blur' }],
  cover: [{ required: true, message: '请输入封面', trigger: 'blur' }],
  price: [{ required: true, message: '请输入价格', trigger: 'blur' }],
  stock: [{ required: true, message: '请输入库存', trigger: 'blur' }],
  description: [{ required: true, message: '请输入描述', trigger: 'blur' }]
})
const init = async () => {
  dialogData.value.title = '创建'
}
watch(
  () => dialogData.value.visible,
  (value) => {
    if (value) {
      init()
    }
  },
  { immediate: true }
)

const handleConfirm = () => {
  createFormRef.value?.validate(
    assertFormValidate(() =>
      api.productSkuController.saveBatch({ body: skuList.value }).then(async (res) => {
        assertSuccess(res).then(() => {
          closeDialog()
          reloadTableData()
        })
      })
    )
  )
}
const attributes = ref<Attribute[]>([])
const handleProductChange = (id: string) => {
  api.productController.findById({ id }).then((res) => {
    attributes.value = res.attributes
    createForm.value = {
      ...createForm.value,
      ..._.pick(res, ['price', 'cover', 'name', 'description'])
    }
    createForm.value.productId = id
  })
}
const skuList = ref<ProductSkuInput[]>([])
watch(
  () => createForm.value,
  () => {
    skuList.value = skuList.value.map((sku) => {
      console.log(sku.values)
      return { ...sku, ...createForm.value, values: sku.values }
    })
  },
  {
    deep: true
  }
)
</script>
<template>
  <div class="create-form">
    <el-form labelWidth="120" class="form" ref="createFormRef" :model="createForm" :rules="rules">
      <el-form-item label="Sku名称" prop="name">
        <el-input v-model="createForm.name"></el-input>
      </el-form-item>
      <el-form-item label="封面" prop="cover">
        <el-input v-model="createForm.cover"></el-input>
      </el-form-item>
      <el-form-item label="价格" prop="price">
        <el-input-number v-model="createForm.price"></el-input-number>
      </el-form-item>
      <el-form-item label="库存" prop="stock">
        <el-input-number v-model="createForm.stock"></el-input-number>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="createForm.description"></el-input>
      </el-form-item>
      <el-form-item label="商品" prop="product">
        <remote-select
          label-prop="name"
          :query-options="productQueryOption"
          :model-value="createForm.productId"
          @update:model-value="handleProductChange"
        ></remote-select>
      </el-form-item>
      <el-form-item label="SKU">
        <product-sku :attributes="attributes" v-model:sku-list="skuList"></product-sku>
      </el-form-item>
    </el-form>
    <footer-button @close="closeDialog" @confirm="handleConfirm"></footer-button>
  </div>
</template>

<style lang="scss" scoped>
.create-form {
  margin-right: 30px;
}
</style>
