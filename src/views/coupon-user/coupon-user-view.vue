<script lang="ts" setup>
import CouponUserTable from './components/coupon-user-table.vue'
import CouponUserQuery from './components/coupon-user-query.vue'
import CouponUserDialog from './components/coupon-user-dialog.vue'
</script>
<template>
  <div class="coupon-user-view">
    <coupon-user-query></coupon-user-query>
    <coupon-user-dialog></coupon-user-dialog>
    <coupon-user-table></coupon-user-table>
  </div>
</template>

<style lang="scss" scoped>
.coupon-user-view {
  background: white;
  padding: 20px;
  border-radius: 5px;
}
</style>
