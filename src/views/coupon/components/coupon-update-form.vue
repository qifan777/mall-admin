<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { reactive, ref, watch } from 'vue'
import { useCouponStore } from '../store/coupon-store'
import { assertFormValidate, assertSuccess } from '@/utils/common'
import { api } from '@/utils/api-instance'
import FooterButton from '@/components/base/dialog/footer-button.vue'
import DictSelect from '@/components/dict/dict-select.vue'
import type { FormInstance, FormRules } from 'element-plus'
import { DictConstants } from '@/apis/__generated/model/enums/DictConstants'

const couponStore = useCouponStore()
const { closeDialog, reloadTableData } = couponStore
const { updateForm, dialogData } = storeToRefs(couponStore)
const updateFormRef = ref<FormInstance>()
const rules = reactive<FormRules<typeof updateForm>>({
  name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
  thresholdAmount: [{ required: true, message: '请输入消费门槛', trigger: 'blur' }],
  releasedQuantity: [{ required: true, message: '请输入发放数量', trigger: 'blur' }],
  effectiveDate: [{ required: true, message: '请输入生效时间', trigger: 'blur' }],
  expirationDate: [{ required: true, message: '请输入失效时间', trigger: 'blur' }],
  type: [{ required: true, message: '请输入优惠券类型', trigger: 'change' }],
  scope: [{ required: true, message: '请输入使用范围', trigger: 'change' }]
})
const init = async () => {
  dialogData.value.title = '编辑'
  updateForm.value = {
    ...(await api.couponController.findById({ id: updateForm.value.id || '' }))
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
      api.couponController.save({ body: updateForm.value }).then(async (res) => {
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
      <el-form-item label="消费门槛" prop="thresholdAmount">
        <el-input-number v-model="updateForm.thresholdAmount"></el-input-number>
      </el-form-item>
      <el-form-item label="发放数量" prop="releasedQuantity">
        <el-input-number v-model="updateForm.releasedQuantity"></el-input-number>
      </el-form-item>
      <el-form-item label="生效时间" prop="effectiveDate">
        <el-date-picker
          v-model="updateForm.effectiveDate"
          type="datetime"
          placeholder="请选择日期"
          value-format="YYYY-MM-DD HH:mm:ss"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="失效时间" prop="expirationDate">
        <el-date-picker
          v-model="updateForm.expirationDate"
          type="datetime"
          placeholder="请选择日期"
          value-format="YYYY-MM-DD HH:mm:ss"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="优惠券类型" prop="type">
        <dict-select :dict-id="DictConstants.COUPON_TYPE" v-model="updateForm.type"></dict-select>
      </el-form-item>
      <el-form-item label="使用范围" prop="scope">
        <dict-select :dict-id="DictConstants.COUPON_SCOPE" v-model="updateForm.scope"></dict-select>
      </el-form-item>
      <el-form-item label="优惠金额" prop="amount" v-if="updateForm.type === 'REDUCE'">
        <el-input-number v-model="updateForm.amount"></el-input-number>
      </el-form-item>
      <el-form-item label="折扣" prop="discount">
        <el-input-number
          v-model="updateForm.discount"
          v-if="updateForm.type === 'DISCOUNT'"
        ></el-input-number>
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
