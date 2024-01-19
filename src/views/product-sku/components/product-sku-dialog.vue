<script lang="ts" setup>
import { type Component } from 'vue'
import { storeToRefs } from 'pinia'
import { useProductSkuStore } from '../store/product-sku-store'
import ProductSkuCreateForm from './product-sku-create-form.vue'
import ProductSkuUpdateForm from './product-sku-update-form.vue'
import type { EditMode } from '@/typings'

const productSkuStore = useProductSkuStore()
const { dialogData } = storeToRefs(productSkuStore)

const formMap: Record<EditMode, Component> = {
  CREATE: ProductSkuCreateForm,
  UPDATE: ProductSkuUpdateForm
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
