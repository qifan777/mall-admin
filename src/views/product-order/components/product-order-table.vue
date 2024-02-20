<script lang="ts" setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import type { Scope } from '@/typings'
import { useProductOrderStore } from '../store/product-order-store'
import type { ProductOrderDto } from '@/apis/__generated/model/dto'
import DictColumn from '@/components/dict/dict-column.vue'
import { DictConstants } from '@/apis/__generated/model/enums/DictConstants'

type ProductOrderScope = Scope<ProductOrderDto['ProductOrderRepository/COMPLEX_FETCHER']>
type ProductOrderItemScope = Scope<
  ProductOrderDto['ProductOrderRepository/COMPLEX_FETCHER']['items'][0]
>

const productOrderStore = useProductOrderStore()
const { loadTableData, reloadTableData, handleSortChange, handleSelectChange } = productOrderStore
const { pageData, loading, queryRequest, table } = storeToRefs(productOrderStore)
onMounted(() => {
  reloadTableData()
})
</script>
<template>
  <div>
    <el-table
      ref="table"
      v-loading="loading"
      :border="true"
      :data="pageData.content"
      @selection-change="handleSelectChange"
      @sort-change="handleSortChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="expand">
        <template #default="props">
          <el-table :data="props.row.items">
            <el-table-column label="购买数量" prop="name" sortable="custom">
              <template v-slot:default="{ row }: ProductOrderItemScope">
                {{ row.skuCount }}
              </template>
            </el-table-column>
            <el-table-column label="Sku名称" prop="name" sortable="custom">
              <template v-slot:default="{ row }: ProductOrderItemScope">
                {{ row.productSku.name }}
              </template>
            </el-table-column>
            <el-table-column label="封面" prop="cover" sortable="custom">
              <template v-slot:default="{ row }: ProductOrderItemScope">
                <el-avatar :src="row.productSku.cover" alt=""></el-avatar>
              </template>
            </el-table-column>
            <el-table-column label="价格" prop="price" sortable="custom">
              <template v-slot:default="{ row }: ProductOrderItemScope">
                {{ row.productSku.price }}
              </template>
            </el-table-column>
            <el-table-column label="库存" prop="stock" sortable="custom">
              <template v-slot:default="{ row }: ProductOrderItemScope">
                {{ row.productSku.stock }}
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column label="备注" prop="remark" sortable="custom">
        <template v-slot:default="{ row }: ProductOrderScope">
          {{ row.remark }}
        </template>
      </el-table-column>
      <el-table-column label="订单状态" prop="status" sortable="custom">
        <template v-slot:default="{ row }: ProductOrderScope">
          <dict-column
            :dict-id="DictConstants.PRODUCT_ORDER_STATUS"
            :value="row.status"
          ></dict-column>
        </template>
      </el-table-column>
      <el-table-column label="支付详情">
        <el-table-column label="支付类型" prop="payType" sortable="custom">
          <template v-slot:default="{ row: { payment } }: ProductOrderScope">
            <dict-column :dict-id="DictConstants.PAY_TYPE" :value="payment.payType"></dict-column>
          </template>
        </el-table-column>
        <el-table-column label="实付金额" prop="payAmount" sortable="custom">
          <template v-slot:default="{ row: { payment } }: ProductOrderScope">
            {{ payment.payAmount }}
          </template>
        </el-table-column>
        <el-table-column label="配送费" prop="deliveryFee" sortable="custom">
          <template v-slot:default="{ row: { payment } }: ProductOrderScope">
            {{ payment.deliveryFee }}
          </template>
        </el-table-column>
        <el-table-column label="优惠卷减免" prop="couponAmount" sortable="custom">
          <template v-slot:default="{ row: { payment } }: ProductOrderScope">
            {{ payment.couponAmount }}
          </template>
        </el-table-column>
        <el-table-column label="VIP减免" prop="vipAmount" sortable="custom">
          <template v-slot:default="{ row: { payment } }: ProductOrderScope">
            {{ payment.vipAmount }}
          </template>
        </el-table-column>
        <el-table-column label="商品金额" prop="productAmount" sortable="custom">
          <template v-slot:default="{ row: { payment } }: ProductOrderScope">
            {{ payment.productAmount }}
          </template>
        </el-table-column>
        <el-table-column label="支付时间" prop="payTime" sortable="custom">
          <template v-slot:default="{ row: { payment } }: ProductOrderScope">
            {{ payment.payTime }}
          </template>
        </el-table-column>
        <el-table-column label="支付订单号" prop="tradeNo" sortable="custom">
          <template v-slot:default="{ row: { payment } }: ProductOrderScope">
            {{ payment.tradeNo }}
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="地址详情">
        <el-table-column label="姓名" prop="realName" sortable="custom">
          <template v-slot:default="{ row }: ProductOrderScope">
            {{ row.address.realName }}
          </template>
        </el-table-column>
        <el-table-column label="电话" prop="phoneNumber" sortable="custom">
          <template v-slot:default="{ row }: ProductOrderScope">
            {{ row.address.phoneNumber }}
          </template>
        </el-table-column>
        <el-table-column label="地址信息" prop="address" sortable="custom">
          <template v-slot:default="{ row }: ProductOrderScope">
            {{ row.address.address }}
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="创建时间" prop="createdTime" sortable="custom">
        <template v-slot:default="{ row }: ProductOrderScope">
          {{ row.createdTime }}
        </template>
      </el-table-column>
      <el-table-column label="更新时间" prop="editedTime" sortable="custom">
        <template v-slot:default="{ row }: ProductOrderScope">
          {{ row.editedTime }}
        </template>
      </el-table-column>
      <el-table-column label="创建人" prop="creator.phone" show-overflow-tooltip sortable="custom">
        <template v-slot:default="{ row }: ProductOrderScope">
          {{ row.creator.nickname }}({{ row.creator.phone }})
        </template>
      </el-table-column>
      <el-table-column label="更新人" prop="editor.phone" show-overflow-tooltip sortable="custom">
        <template v-slot:default="{ row }: ProductOrderScope">
          {{ row.editor.nickname }}({{ row.editor.phone }})
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template v-slot:default="{ row }">
          <div></div>
        </template>
      </el-table-column>
    </el-table>
    <div class="page">
      <el-pagination
        :current-page="queryRequest.pageNum"
        :page-size="queryRequest.pageSize"
        :page-sizes="[10, 20, 30, 40, 50]"
        :total="pageData.totalElements"
        background
        layout="prev, pager, next, jumper, total, sizes"
        small
        style="margin-top: 30px"
        @current-change="(pageNum) => loadTableData({ pageNum })"
        @size-change="(pageSize) => loadTableData({ pageSize })"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.button-section {
  margin: 20px 0;
}

.page {
  display: flex;
  justify-content: flex-end;
}
</style>
