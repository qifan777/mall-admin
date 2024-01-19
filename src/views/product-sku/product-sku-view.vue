<script lang="ts" setup>
import ProductSkuTable from './components/product-sku-table.vue'
import ProductSkuQuery from './components/product-sku-query.vue'
import ProductSkuDialog from './components/product-sku-dialog.vue'
</script>
<template>
  <div class="product-sku-view">
    <product-sku-query></product-sku-query>
    <product-sku-dialog></product-sku-dialog>
    <product-sku-table></product-sku-table>
  </div>
</template>

<style lang="scss" scoped>
.product-sku-view {
  background: white;
  padding: 20px;
  border-radius: 5px;
}
</style>
