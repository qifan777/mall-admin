<script lang="ts" setup>
import ProductTable from './components/product-table.vue'
import ProductQuery from './components/product-query.vue'
import ProductDialog from './components/product-dialog.vue'
</script>
<template>
  <div class="product-view">
    <product-query></product-query>
    <product-dialog></product-dialog>
    <product-table></product-table>
  </div>
</template>

<style lang="scss" scoped>
.product-view {
  background: white;
  padding: 20px;
  border-radius: 5px;
}
</style>
