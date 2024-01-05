<script lang="ts" setup>
import { toRefs } from 'vue'
import { useProductStore } from '../store/product-store'
import { storeToRefs } from 'pinia'
import DictSelect from '@/components/dict/dict-select.vue'

const productStore = useProductStore()
const { queryData } = storeToRefs(productStore)
const { query } = toRefs(queryData.value)
</script>
<template>
  <div class="search">
    <el-form inline label-width="80" size="small">
      <el-form-item label="名称">
        <el-input v-model="query.name"></el-input>
      </el-form-item>
      <el-form-item label="价格">
        <el-input v-model="query.price"></el-input>
      </el-form-item>
      <el-form-item label="品牌">
        <el-input v-model="query.brand"></el-input>
      </el-form-item>
      <el-form-item label="库存">
        <el-input v-model="query.stock"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="query.description"></el-input>
      </el-form-item>
      <el-form-item label="标签">
        <el-input v-model="query.tags"></el-input>
      </el-form-item>
      <el-form-item label="特性">
        <el-input v-model="query.features"></el-input>
      </el-form-item>
      <el-form-item label="规格">
        <el-input v-model="query.specs"></el-input>
      </el-form-item>
      <el-form-item label=" ">
        <div class="btn-wrapper">
          <el-button
            type="primary"
            size="small"
            @click="productStore.reloadTableData({ query: query, likeMode: 'ANYWHERE' })"
          >
            查询
          </el-button>
          <el-button type="warning" size="small" @click="productStore.restQuery()"> 重置</el-button>
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
