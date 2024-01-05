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
const { updateForm, dialogData } = storeToRefs(couponUserStore)
const updateFormRef = ref<FormInstance>()
const rules = reactive<FormRules<typeof updateForm>>({
  receiveType: [{ required: true, message: '请输入获得渠道', trigger: 'blur' }],
  status: [{ required: true, message: '请输入优惠券状态', trigger: 'change' }]
})
const init = async () => {
  dialogData.value.title = '编辑'
  updateForm.value = {
    ...(await api.couponUserController.findById({ id: updateForm.value.id || '' }))
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
      api.couponUserController.save({ body: updateForm.value }).then(async (res) => {
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
      <el-form-item label="获得方式">
        <dict-select :dict-id="1006" v-model="updateForm.receiveType"></dict-select>
      </el-form-item>
      <!-- <el-form-item label="优惠券" prop="coupon">
        <el-input-number v-model="updateForm.coupon"></el-input-number>
      </el-form-item>
      <el-form-item label="拥有者" prop="user">
        <el-input-number v-model="updateForm.user"></el-input-number>
      </el-form-item> -->
      <el-form-item label="优惠券状态" prop="status">
        <dict-select :dict-id="1005" v-model="updateForm.status"></dict-select>
      </el-form-item>
    </el-form>
    <footer-button @close="closeDialog" @confirm="handleConfirm"></footer-button>
  </div>
</template>

<style lang="scss" scoped>
.update-form {
  margin-right: 30px;
}
</style>
