<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { reactive, ref, watch } from 'vue'
import { useProductStore } from '../store/product-store'
import { assertFormValidate, assertSuccess } from '@/utils/common'
import { api } from '@/utils/api-instance'
import FooterButton from '@/components/base/dialog/footer-button.vue'
import type { FormInstance, FormRules } from 'element-plus'
import RemoteSelect from '@/components/base/form/remote-select.vue'
import TagInput from '@/components/tag/tag-input.vue'
import ProductSku from '@/views/product-sku/product-sku.vue'
import KeyValueInput from './key-value-input.vue'
import ImageUpload from '@/components/image/image-upload.vue'

const productStore = useProductStore()
const { closeDialog, reloadTableData } = productStore
const { createForm, dialogData } = storeToRefs(productStore)
const createFormRef = ref<FormInstance>()
const rules = reactive<FormRules<typeof createForm>>({
  name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
  image: [{ required: true, message: '请输入封面', trigger: 'blur' }],
  brand: [{ required: true, message: '请输入品牌', trigger: 'blur' }],
  description: [{ required: true, message: '请输入描述', trigger: 'blur' }],
  tags: [{ required: true, message: '请输入标签', trigger: 'blur' }],
  features: [{ required: true, message: '请输入特性', trigger: 'blur' }],
  specs: [{ required: true, message: '请输入规格', trigger: 'blur' }],
  categoryId: [{ required: true, message: '请选择分类', trigger: 'blur' }]
})
const init = async () => {
  dialogData.value.title = '创建'
  dialogData.value.width = 1000
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
      api.productController.save({ body: createForm.value }).then(async (res) => {
        assertSuccess(res).then(() => {
          closeDialog()
          reloadTableData()
        })
      })
    )
  )
}
const categoryQueryOptions = async (keyword: string) => {
  return (await api.productCategoryController.query({ body: { query: { name: keyword } } })).content
}
</script>
<template>
  <div class="create-form">
    <el-form labelWidth="120" class="form" ref="createFormRef" :model="createForm" :rules="rules">
      <el-form-item label="名称" prop="name">
        <el-input v-model="createForm.name"></el-input>
      </el-form-item>
      <el-form-item label="价格" prop="price">
        <el-input-number v-model="createForm.price"></el-input-number>
      </el-form-item>
      <el-form-item label="封面" prop="image">
        <image-upload v-model="createForm.image"></image-upload>
      </el-form-item>
      <el-form-item label="品牌" prop="brand">
        <el-input v-model="createForm.brand"></el-input>
      </el-form-item>
      <el-form-item label="库存" prop="stock">
        <el-input-number v-model="createForm.stock"></el-input-number>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="createForm.description"></el-input>
      </el-form-item>
      <el-form-item label="标签" prop="tags">
        <tag-input v-model="createForm.tags"></tag-input>
      </el-form-item>
      <el-form-item label="特性" prop="features">
        <el-input v-model="createForm.features"></el-input>
      </el-form-item>
      <el-form-item label="规格" prop="specs">
        <el-input v-model="createForm.specs"></el-input>
      </el-form-item>
      <el-form-item label="类别" prop="categoryId">
        <remote-select
          label-prop="name"
          :query-options="categoryQueryOptions"
          v-model="createForm.categoryId"
        ></remote-select>
      </el-form-item>
      <el-form-item label="属性">
        <key-value-input v-model:data="createForm.attributes"></key-value-input>
      </el-form-item>
      <el-form-item label="规格">
        <product-sku
          :attributes="createForm.attributes"
          v-model:skuList="createForm.skuList"
        ></product-sku>
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
