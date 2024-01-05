<script lang="ts" setup>
import ProductCategoryTable from './components/product-category-table.vue'
import ProductCategoryQuery from './components/product-category-query.vue'
import ProductCategoryDialog from './components/product-category-dialog.vue'
</script>
<template>
  <div class="product-category-view">
    <product-category-query></product-category-query>
    <product-category-dialog></product-category-dialog>
    <product-category-table></product-category-table>
  </div>
</template>

<style lang="scss" scoped>
.product-category-view {
  background: white;
  padding: 20px;
  border-radius: 5px;
}
</style>
