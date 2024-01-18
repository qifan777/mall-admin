<script lang="ts" setup>
import { type Component } from 'vue'
import { storeToRefs } from 'pinia'
import { useProductCategoryStore } from '../store/product-category-store'
import ProductCategoryCreateForm from './product-category-create-form.vue'
import ProductCategoryUpdateForm from './product-category-update-form.vue'
import type { EditMode } from '@/typings'

const productCategoryStore = useProductCategoryStore()
const { dialogData } = storeToRefs(productCategoryStore)

const formMap: Record<EditMode, Component> = {
  CREATE: ProductCategoryCreateForm,
  UPDATE: ProductCategoryUpdateForm
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
