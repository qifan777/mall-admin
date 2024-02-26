<script lang="ts" setup>
import { type Component } from 'vue'
import { storeToRefs } from 'pinia'
import { useCouponStore } from '../store/coupon-store'
import CouponCreateForm from './coupon-create-form.vue'
import CouponUpdateForm from './coupon-update-form.vue'
import type { EditMode } from '@/typings'

const couponStore = useCouponStore()
const { dialogData } = storeToRefs(couponStore)

const formMap: Record<EditMode, Component> = {
  CREATE: CouponCreateForm,
  UPDATE: CouponUpdateForm
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
