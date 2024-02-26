<script lang="ts" setup>
import CouponTable from './components/coupon-table.vue'
import CouponQuery from './components/coupon-query.vue'
import CouponDialog from './components/coupon-dialog.vue'
</script>
<template>
  <div class="coupon-view">
    <coupon-query></coupon-query>
    <coupon-dialog></coupon-dialog>
    <coupon-table></coupon-table>
  </div>
</template>

<style lang="scss" scoped>
.coupon-view {
  background: white;
  padding: 20px;
  border-radius: 5px;
}
</style>
