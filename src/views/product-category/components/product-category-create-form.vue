<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { reactive, ref, watch } from 'vue'
import { useProductCategoryStore } from '../store/product-category-store'
import { assertFormValidate, assertSuccess } from '@/utils/common'
import { api } from '@/utils/api-instance'
import FooterButton from '@/components/base/dialog/footer-button.vue'
import DictSelect from '@/components/dict/dict-select.vue'
import type { FormInstance, FormRules } from 'element-plus'
import ImageUpload from '@/components/image/image-upload.vue'

const productCategoryStore = useProductCategoryStore()
const { closeDialog, reloadTableData } = productCategoryStore
const { createForm, dialogData } = storeToRefs(productCategoryStore)
const createFormRef = ref<FormInstance>()
const rules = reactive<FormRules<typeof createForm>>({
  name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
  image: [{ required: true, message: '请输入图片', trigger: 'blur' }],
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
      api.productCategoryController.save({ body: createForm.value }).then(async (res) => {
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
      <el-form-item label="图片" prop="image">
        <image-upload v-model="createForm.image"></image-upload>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="createForm.description"></el-input>
      </el-form-item>
      <el-form-item label="排序号" prop="sortOrder">
        <el-input-number v-model="createForm.sortOrder"></el-input-number>
      </el-form-item>
    </el-form>
    <FooterButton @close="closeDialog" @confirm="handleConfirm"></FooterButton>
  </div>
</template>

<style lang="scss" scoped>
.create-form {
  margin-right: 30px;
}
</style>
