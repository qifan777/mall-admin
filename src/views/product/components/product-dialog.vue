<script lang="ts" setup>
import { type Component } from 'vue'
import { storeToRefs } from 'pinia'
import { useProductStore } from '../store/product-store'
import ProductCreateForm from './product-create-form.vue'
import ProductUpdateForm from './product-update-form.vue'
import type { EditMode } from '@/typings'

const productStore = useProductStore()
const { dialogData } = storeToRefs(productStore)

const formMap: Record<EditMode, Component> = {
  CREATE: ProductCreateForm,
  UPDATE: ProductUpdateForm
}
</script>
<template>
  <div>
    <el-dialog
      v-model="dialogData.visible"
      :title="dialogData.title"
      :width="dialogData.width"
      fullscreen
    >
      <component :is="formMap[dialogData.mode]"></component>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped></style>
