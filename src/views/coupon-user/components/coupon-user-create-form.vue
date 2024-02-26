<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { reactive, ref, watch } from 'vue'
import { useCouponUserStore } from '../store/coupon-user-store'
import { assertFormValidate, assertSuccess } from '@/utils/common'
import { api } from '@/utils/api-instance'
import FooterButton from '@/components/base/dialog/footer-button.vue'
import DictSelect from '@/components/dict/dict-select.vue'
import type { FormInstance, FormRules } from 'element-plus'
import { DictConstants } from '@/apis/__generated/model/enums/DictConstants'
import RemoteSelect from '@/components/base/form/remote-select.vue'
import { couponQueryOptions } from '@/views/coupon/store/coupon-store'
import { userLabelProp, userQueryOptions } from '@/views/user/store/user-store'

const couponUserStore = useCouponUserStore()
const { closeDialog, reloadTableData } = couponUserStore
const { createForm, dialogData } = storeToRefs(couponUserStore)
const createFormRef = ref<FormInstance>()
const rules = reactive<FormRules<typeof createForm>>({})
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
        <dict-select
          :dict-id="DictConstants.COUPON_RECEIVE_TYPE"
          v-model="createForm.receiveType"
        ></dict-select>
      </el-form-item>
      <el-form-item label="优惠券" prop="coupon">
        <remote-select
          v-model="createForm.couponId"
          label-prop="name"
          :query-options="couponQueryOptions"
        ></remote-select>
      </el-form-item>
      <el-form-item label="拥有者" prop="user">
        <remote-select
          v-model="createForm.userId"
          :label-prop="userLabelProp"
          :query-options="userQueryOptions"
        ></remote-select>
      </el-form-item>
      <el-form-item label="优惠券状态" prop="status">
        <dict-select
          :dict-id="DictConstants.COUPON_USE_STATUS"
          v-model="createForm.status"
        ></dict-select>
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
