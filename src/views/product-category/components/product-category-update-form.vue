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
const { updateForm, dialogData } = storeToRefs(productCategoryStore)
const updateFormRef = ref<FormInstance>()
const rules = reactive<FormRules<typeof updateForm>>({
  name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
  image: [{ required: true, message: '请输入图片', trigger: 'blur' }],
  description: [{ required: true, message: '请输入描述', trigger: 'blur' }]
})
const init = async () => {
  dialogData.value.title = '编辑'
  updateForm.value = {
    ...(await api.productCategoryController.findById({ id: updateForm.value.id || '' }))
  }
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
  updateFormRef.value?.validate(
    assertFormValidate(() => {
      api.productCategoryController.save({ body: updateForm.value }).then(async (res) => {
        assertSuccess(res).then(() => {
          closeDialog()
          reloadTableData()
        })
      })
    })
  )
}
</script>
<template>
  <div class="update-form">
    <el-form labelWidth="120" class="form" ref="updateFormRef" :model="updateForm" :rules="rules">
      <el-form-item label="名称" prop="name">
        <el-input v-model="updateForm.name"></el-input>
      </el-form-item>
      <el-form-item label="图片" prop="image">
        <image-upload v-model="updateForm.image"></image-upload>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="updateForm.description"></el-input>
      </el-form-item>
      <el-form-item label="排序号" prop="sortOrder">
        <el-input-number v-model="updateForm.sortOrder"></el-input-number>
      </el-form-item>
    </el-form>
    <FooterButton @close="closeDialog" @confirm="handleConfirm"></FooterButton>
  </div>
</template>

<style lang="scss" scoped>
.update-form {
  margin-right: 30px;
}
</style>
