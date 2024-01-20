<script lang="ts" setup>
import { toRefs } from 'vue'
import { useProductSkuStore } from '../store/product-sku-store'
import { storeToRefs } from 'pinia'

const productSkuStore = useProductSkuStore()
const { queryData } = storeToRefs(productSkuStore)
const { query } = toRefs(queryData.value)
</script>
<template>
  <div class="search">
    <el-form inline label-width="80" size="small">
      <el-form-item label="Sku名称">
        <el-input v-model="query.name"></el-input>
      </el-form-item>
      <el-form-item label="属性组合值">
        <el-input v-model="query.valuesStr"></el-input>
      </el-form-item>
      <el-form-item label="商品">
        <el-input v-model="query.productId"></el-input>
      </el-form-item>
      <el-form-item label="价格">
        <el-input-number v-model="query.price" controls-position="right"></el-input-number>
      </el-form-item>
      <el-form-item label="库存">
        <el-input-number v-model="query.stock" controls-position="right"></el-input-number>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="query.description"></el-input>
      </el-form-item>
      <el-form-item label=" ">
        <div class="btn-wrapper">
          <el-button
            type="primary"
            size="small"
            @click="productSkuStore.reloadTableData({ query: query, likeMode: 'ANYWHERE' })"
          >
            查询
          </el-button>
          <el-button type="warning" size="small" @click="productSkuStore.restQuery()">
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
