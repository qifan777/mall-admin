<script lang="ts" setup>
import { type Component } from 'vue'
import { storeToRefs } from 'pinia'
import { useCouponUserStore } from '../store/coupon-user-store'
import CouponUserCreateForm from './coupon-user-create-form.vue'
import CouponUserUpdateForm from './coupon-user-update-form.vue'
import type { EditMode } from '@/typings'

const couponUserStore = useCouponUserStore()
const { dialogData } = storeToRefs(couponUserStore)

const formMap: Record<EditMode, Component> = {
  CREATE: CouponUserCreateForm,
  UPDATE: CouponUserUpdateForm
}
</script>
<template>
  <div>
    <el-dialog v-model="dialogData.visible" :title="dialogData.title" :width="dialogData.width">
      <component :is="formMap[dialogData.mode]"></component>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped></style>
