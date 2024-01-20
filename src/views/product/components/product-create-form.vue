<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { reactive, ref, watch } from 'vue'
import { useProductStore } from '../store/product-store'
import { assertFormValidate, assertSuccess } from '@/utils/common'
import { api } from '@/utils/api-instance'
import ImageUpload from '@/components/image/image-upload.vue'
import FooterButton from '@/components/base/dialog/footer-button.vue'
import type { FormInstance, FormRules } from 'element-plus'
import RemoteSelect from '@/components/base/form/remote-select.vue'
import { categoryQueryOption } from '@/views/product-category/store/product-category-store'
import KeyValueInput from '@/components/key-value/key-value-input.vue'
import ValueInput from '@/components/key-value/value-input.vue'

const productStore = useProductStore()
const { closeDialog, reloadTableData } = productStore
const { createForm, dialogData } = storeToRefs(productStore)
const createFormRef = ref<FormInstance>()
const rules = reactive<FormRules<typeof createForm>>({
  name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
  price: [{ required: true, message: '请输入价格', trigger: 'blur' }],
  cover: [{ required: true, message: '请输入封面', trigger: 'blur' }],
  brand: [{ required: true, message: '请输入品牌', trigger: 'blur' }],
  categoryId: [{ required: true, message: '请输入类别', trigger: 'blur' }],
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
      api.productController.save({ body: createForm.value }).then(async (res) => {
        assertSuccess(res).then(() => {
          closeDialog()
          reloadTableData()
        })
      })
    )
  )
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
      <el-form-item label="封面" prop="cover">
        <image-upload v-model="createForm.cover"></image-upload>
      </el-form-item>
      <el-form-item label="品牌" prop="brand">
        <el-input v-model="createForm.brand"></el-input>
      </el-form-item>
      <el-form-item label="类别" prop="categoryId">
        <remote-select
          label-prop="name"
          :query-options="categoryQueryOption"
          v-model="createForm.categoryId"
        ></remote-select>
      </el-form-item>
      <el-form-item label="库存" prop="stock">
        <el-input-number v-model="createForm.stock"></el-input-number>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="createForm.description"></el-input>
      </el-form-item>
      <el-form-item label="标签" prop="tags">
        <value-input v-model="createForm.tags"></value-input>
      </el-form-item>
      <el-form-item label="规格" prop="specifications">
        <key-value-input v-model="createForm.specifications"></key-value-input>
      </el-form-item>
      <el-form-item label="属性" prop="attributes">
        <key-value-input v-model="createForm.attributes"></key-value-input>
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
