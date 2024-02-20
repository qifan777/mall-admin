<script lang="ts" setup>
import { toRefs } from 'vue'
import { useProductOrderStore } from '../store/product-order-store'
import { storeToRefs } from 'pinia'
import DictSelect from '@/components/dict/dict-select.vue'
import { DictConstants } from '@/apis/__generated/model/enums/DictConstants'
import DatetimePicker from '@/components/datetime/datetime-picker.vue'
import _ from 'lodash'

const productOrderStore = useProductOrderStore()
const { queryData } = storeToRefs(productOrderStore)
const { query } = toRefs(queryData.value)

const handleQuery = () => {
  // query.value.payment = omit(query.value.payment)
  // if (query.value.items) {
  //   query.value.items.productSku = omit(query.value.items.productSku)
  // }
  // query.value.address = omit(query.value.address)
  // query.value.creator = omit(query.value.creator)
  productOrderStore.reloadTableData({ query: query.value, likeMode: 'ANYWHERE' })
}
const omit = (obj: any) => {
  return {
    ..._.omitBy(obj, (row) => {
      if (_.isString(row)) {
        return _.isEmpty(row)
      } else {
        return _.isNil(row)
      }
    })
  }
}
</script>
<template>
  <div class="search">
    <el-form inline label-width="80" size="small">
      <el-form-item label="备注">
        <el-input v-model="query.remark"></el-input>
      </el-form-item>
      <el-form-item label="订单状态">
        <dict-select
          v-model="query.status"
          :dict-id="DictConstants.PRODUCT_ORDER_STATUS"
        ></dict-select>
      </el-form-item>
      <el-form-item label="Sku名称" v-if="query.items && query.items.productSku">
        <el-input v-model="query.items.productSku.name"></el-input>
      </el-form-item>
      <el-form-item label="创建人手机号" v-if="query.creator">
        <el-input v-model="query.creator.phone"></el-input>
      </el-form-item>
      <el-form-item label="收货人手机号" v-if="query.address">
        <el-input v-model="query.address.phoneNumber"></el-input>
      </el-form-item>
      <template v-if="query.payment">
        <el-form-item label="支付时间">
          <datetime-picker
            v-model:min-date-time="query.payment.minPayTime"
            v-model:max-date-time="query.payment.maxPayTime"
          >
          </datetime-picker>
        </el-form-item>
        <el-form-item label="支付订单号">
          <el-input v-model="query.payment.tradeNo"></el-input>
        </el-form-item>
        <el-form-item label="支付类型">
          <dict-select
            :dict-id="DictConstants.PAY_TYPE"
            v-model="query.payment.payType"
          ></dict-select>
        </el-form-item>
      </template>
      <el-form-item label=" ">
        <div class="btn-wrapper">
          <el-button size="small" type="primary" @click="handleQuery"> 查询 </el-button>
          <el-button size="small" type="warning" @click="productOrderStore.restQuery()">
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
