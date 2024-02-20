<script lang="ts" setup>
import ProductOrderTable from './components/product-order-table.vue'
import ProductOrderQuery from './components/product-order-query.vue'
</script>
<template>
  <div class="product-order-view">
    <product-order-query></product-order-query>
    <product-order-table></product-order-table>
  </div>
</template>

<style lang="scss" scoped>
.product-order-view {
  background: white;
  padding: 20px;
  border-radius: 5px;
}
</style>
