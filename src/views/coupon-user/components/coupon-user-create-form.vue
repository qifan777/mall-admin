<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { reactive, ref, watch } from 'vue'
import { useCouponUserStore } from '../store/coupon-user-store'
import { assertFormValidate, assertSuccess } from '@/utils/common'
import { api } from '@/utils/api-instance'
import FooterButton from '@/components/base/dialog/footer-button.vue'
import DictSelect from '@/components/dict/dict-select.vue'
import type { FormInstance, FormRules } from 'element-plus'

const couponUserStore = useCouponUserStore()
const { closeDialog, reloadTableData } = couponUserStore
const { createForm, dialogData } = storeToRefs(couponUserStore)
const createFormRef = ref<FormInstance>()
const rules = reactive<FormRules<typeof createForm>>({
  receiveType: [{ required: true, message: '请输入获得渠道', trigger: 'blur' }],
  status: [{ required: true, message: '请输入优惠券状态', trigger: 'change' }]
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
      api.couponUserController.save({ body: createForm.value }).then(async (res) => {
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
      <el-form-item label="获得方式" prop="receiveType">
        <dict-select :dict-id="1006" v-model="createForm.receiveType"></dict-select>
      </el-form-item>
      <!-- <el-form-item label="优惠券" prop="coupon">
        <el-input-number v-model="createForm."></el-input-number>
      </el-form-item>
      <el-form-item label="拥有者" prop="user">
        <el-input-number v-model="createForm.user"></el-input-number>
      </el-form-item> -->
      <el-form-item label="优惠券状态" prop="status">
        <dict-select :dict-id="1005" v-model="createForm.status"></dict-select>
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
