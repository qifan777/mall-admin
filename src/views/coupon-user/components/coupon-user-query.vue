<script lang="ts" setup>
import { toRefs } from 'vue'
import { useCouponUserStore } from '../store/coupon-user-store'
import { storeToRefs } from 'pinia'
import DictSelect from '@/components/dict/dict-select.vue'
import { DictConstants } from '@/apis/__generated/model/enums/DictConstants'
import RemoteSelect from '@/components/base/form/remote-select.vue'
import { couponQueryOptions } from '@/views/coupon/store/coupon-store'
import { userLabelProp, userQueryOptions } from '@/views/user/store/user-store'

const couponUserStore = useCouponUserStore()
const { queryData } = storeToRefs(couponUserStore)
const { query } = toRefs(queryData.value)
</script>
<template>
  <div class="search">
    <el-form inline label-width="80" size="small">
      <el-form-item label="获得方式">
        <dict-select
          :dict-id="DictConstants.COUPON_RECEIVE_TYPE"
          v-model="query.receiveType"
        ></dict-select>
      </el-form-item>
      <el-form-item label="优惠券" prop="coupon">
        <remote-select
          v-model="query.couponId"
          label-prop="name"
          :query-options="couponQueryOptions"
        ></remote-select>
      </el-form-item>
      <el-form-item label="拥有者" prop="user">
        <remote-select
          v-model="query.userId"
          :label-prop="userLabelProp"
          :query-options="userQueryOptions"
        ></remote-select>
      </el-form-item>
      <el-form-item label="优惠券状态">
        <dict-select
          :dict-id="DictConstants.COUPON_USE_STATUS"
          v-model="query.status"
        ></dict-select>
      </el-form-item>
      <el-form-item label=" ">
        <div class="btn-wrapper">
          <el-button
            type="primary"
            size="small"
            @click="couponUserStore.reloadTableData({ query: query, likeMode: 'ANYWHERE' })"
          >
            查询
          </el-button>
          <el-button type="warning" size="small" @click="couponUserStore.restQuery()">
            重置</el-button
          >
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-form-item) {
  margin-bottom: 5px;
}

.search {
  display: flex;
  flex-flow: column nowrap;
  width: 100%;

  .btn-wrapper {
    margin-left: 20px;
  }
}
</style>
