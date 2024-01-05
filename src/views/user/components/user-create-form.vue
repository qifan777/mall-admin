<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { reactive, ref, watch } from 'vue'
import { useUserStore } from '../store/user-store'
import { assertFormValidate, assertSuccess } from '@/utils/common'
import { api } from '@/utils/api-instance'
import FooterButton from '@/components/base/dialog/footer-button.vue'
import DictSelect from '@/components/dict/dict-select.vue'
import type { FormInstance, FormRules } from 'element-plus'
import RemoteSelect from '@/components/base/form/remote-select.vue'
import ImageUpload from '@/components/image/image-upload.vue'

const userStore = useUserStore()
const { closeDialog, reloadTableData } = userStore
const { createForm, dialogData } = storeToRefs(userStore)
const createFormRef = ref<FormInstance>()
const rules = reactive<FormRules<typeof createForm>>({
  phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
  nickname: [{ required: true, message: '请输入昵称', trigger: 'blur' }]
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
      api.userController.save({ body: createForm.value }).then(async (res) => {
        assertSuccess(res).then(() => {
          closeDialog()
          reloadTableData()
        })
      })
    )
  )
}
const roleQueryOptions = async (keyword: string) => {
  return (await api.roleController.query({ body: { query: { name: keyword } } })).content
}
</script>
<template>
  <div class="create-form">
    <el-form ref="createFormRef" :model="createForm" :rules="rules" class="form" labelWidth="120">
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="createForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="createForm.nickname"></el-input>
      </el-form-item>
      <el-form-item label="头像" prop="avatar">
        <image-upload v-model="createForm.avatar"></image-upload>
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <dict-select v-model="createForm.gender" :dict-id="1001"></dict-select>
      </el-form-item>
      <el-form-item label="角色">
        <remote-select
          :query-options="roleQueryOptions"
          v-model="createForm.roleIds"
          label-prop="name"
          multiple
        >
        </remote-select>
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
