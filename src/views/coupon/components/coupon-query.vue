<script lang="ts" setup>
import { toRefs } from 'vue'
import { useCouponStore } from '../store/coupon-store'
import { storeToRefs } from 'pinia'
import DictSelect from '@/components/dict/dict-select.vue'
import DatetimePicker from '@/components/datetime/datetime-picker.vue'
import { DictConstants } from '@/apis/__generated/model/enums/DictConstants'

const couponStore = useCouponStore()
const { queryData } = storeToRefs(couponStore)
const { query } = toRefs(queryData.value)
</script>
<template>
  <div class="search">
    <el-form inline label-width="80" size="small">
      <el-form-item label="名称">
        <el-input v-model="query.name"></el-input>
      </el-form-item>
      <el-form-item label="消费门槛">
        <el-input-number
          v-model="query.thresholdAmount"
          controls-position="right"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="发放数量">
        <el-input-number
          v-model="query.releasedQuantity"
          controls-position="right"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="生效时间">
        <datetime-picker
          v-model:min-date-time="query.minEffectiveDate"
          v-model:max-date-time="query.maxEffectiveDate"
        >
        </datetime-picker>
      </el-form-item>
      <el-form-item label="失效时间">
        <datetime-picker
          v-model:min-date-time="query.minExpirationDate"
          v-model:max-date-time="query.maxExpirationDate"
        >
        </datetime-picker>
      </el-form-item>
      <el-form-item label="优惠券类型">
        <dict-select :dict-id="DictConstants.COUPON_TYPE" v-model="query.type"></dict-select>
      </el-form-item>
      <el-form-item label="使用范围">
        <dict-select :dict-id="DictConstants.COUPON_SCOPE" v-model="query.scope"></dict-select>
      </el-form-item>
      <el-form-item label="优惠金额">
        <el-input-number v-model="query.amount" controls-position="right"></el-input-number>
      </el-form-item>
      <el-form-item label="折扣">
        <el-input-number v-model="query.discount" controls-position="right"></el-input-number>
      </el-form-item>
      <el-form-item label=" ">
        <div class="btn-wrapper">
          <el-button
            type="primary"
            size="small"
            @click="couponStore.reloadTableData({ query: query, likeMode: 'ANYWHERE' })"
          >
            查询
          </el-button>
          <el-button type="warning" size="small" @click="couponStore.restQuery()"> 重置</el-button>
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
