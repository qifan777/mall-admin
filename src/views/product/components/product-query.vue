<script lang="ts" setup>
import { toRefs } from 'vue'
import { useProductStore } from '../store/product-store'
import { storeToRefs } from 'pinia'
import RemoteSelect from '@/components/base/form/remote-select.vue'
import { categoryQueryOption } from '@/views/product-category/store/product-category-store'

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
        <el-input-number v-model="query.price" controls-position="right"></el-input-number>
      </el-form-item>
      <el-form-item label="品牌">
        <el-input v-model="query.brand"></el-input>
      </el-form-item>
      <el-form-item label="类别" prop="categoryId">
        <remote-select
          label-prop="name"
          :query-options="categoryQueryOption"
          v-model="query.categoryId"
        ></remote-select>
      </el-form-item>
      <el-form-item label="库存">
        <el-input-number v-model="query.stock" controls-position="right"></el-input-number>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="query.description"></el-input>
      </el-form-item>
      <el-form-item label="标签">
        <el-input-number v-model="query.tags" controls-position="right"></el-input-number>
      </el-form-item>
      <el-form-item label="规格">
        <el-input-number v-model="query.specifications" controls-position="right"></el-input-number>
      </el-form-item>
      <el-form-item label="属性">
        <el-input-number v-model="query.attributes" controls-position="right"></el-input-number>
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
