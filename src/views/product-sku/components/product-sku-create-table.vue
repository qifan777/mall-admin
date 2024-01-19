<script lang="ts" setup>
import { computed, watch } from 'vue'
import type { Attribute, ProductSkuInput } from '@/apis/__generated/model/static'
import type { Scope } from '@/typings'
import _ from 'lodash'

type ProductSku = ProductSkuInput & {
  [index: string]: string | string[] | number
}
type ProductSkuScope = Scope<ProductSku>

const props = withDefaults(
  defineProps<{
    attributes: Attribute[]
    skuList: ProductSkuInput[]
  }>(),
  {
    attributes: () => {
      return []
    },
    skuList: () => {
      return []
    }
  }
)
const emit = defineEmits<{ 'update:skuList': [skuList: ProductSku[]] }>()
const initSku: ProductSku = {
  productId: '',
  cover: '',
  description: '',
  name: '',
  price: 0,
  stock: 0,
  values: []
}
// const skuArray = ref<ProductSku[]>([])
// 递归排列组合
const deep = (sku: ProductSku, depth: number, attrList: Attribute[]) => {
  const list: ProductSku[] = []
  if (attrList.length === 0) {
    return []
  }
  if (depth === attrList.length) {
    return [_.cloneDeep(sku)]
  }
  const attribute = attrList[depth]
  if (attribute.values.length === 0) return []
  // 获取每个属性的值(选择的)，将各个属性的值进行组合
  const attrValues = attribute.values
  attrValues.forEach((value) => {
    // sku对象新增字段，字段的名字是属性的名字。比如 {"糖份"："多糖"}
    sku[attribute.name] = value
    // 加入当前属性的参数
    sku.values.push(value)
    // 获取下一个属性的参数
    list.push(...deep(sku, depth + 1, attrList))
    // 弹出当前属性的参数，准备加入当前属性的下一个参数
    sku.values.pop()
  })
  return list
}
const skuArray = computed(() => {
  return props.skuList.map((sku) => {
    const row: ProductSku = { ...sku }
    sku.values.forEach((attrValue, index) => {
      row[props.attributes[index].name] = attrValue
    })
    return row
  })
})
watch(
  () => props.attributes,
  (value, oldValue) => {
    // 第一次加载时使用默认的skuList不需要重新生成
    if (oldValue.length === 0 && props.skuList.length > 0) {
      return
    }
    const skuList = deep({ ...initSku }, 0, props.attributes)
    console.log(skuList)
    // 当属性修改时重新生成skuList
    emit('update:skuList', skuList)
  },
  { deep: true }
)
</script>
<template>
  <el-table ref="table" :data="skuArray" :border="true">
    <el-table-column
      v-for="attribute in attributes"
      :key="attribute.name"
      :prop="attribute.name"
      :label="attribute.name"
      minWidth="100"
      show-overflow-tooltip
    >
    </el-table-column>
    <el-table-column
      label="Sku名称"
      prop="name"
      sortable="custom"
      min-width="120"
      show-overflow-tooltip
    >
      <template v-slot:default="{ row }: ProductSkuScope">
        {{ row.name }}
      </template>
    </el-table-column>
    <el-table-column label="封面" prop="cover" sortable="custom" min-width="80">
      <template v-slot:default="{ row }: ProductSkuScope">
        <ElAvatar :src="row.cover"></ElAvatar>
      </template>
    </el-table-column>
    <el-table-column
      label="价格"
      prop="price"
      sortable="custom"
      min-width="80"
      show-overflow-tooltip
    >
      <template v-slot:default="{ row }: ProductSkuScope">
        {{ row.price }}
      </template>
    </el-table-column>
    <el-table-column
      label="库存"
      prop="stock"
      sortable="custom"
      min-width="80"
      show-overflow-tooltip
    >
      <template v-slot:default="{ row }: ProductSkuScope">
        {{ row.stock }}
      </template>
    </el-table-column>
    <el-table-column
      label="描述"
      prop="description"
      sortable="custom"
      min-width="120"
      show-overflow-tooltip
    >
      <template v-slot:default="{ row }: ProductSkuScope">
        {{ row.description }}
      </template>
    </el-table-column>
  </el-table>
</template>

<style lang="scss" scoped>
.create-form {
  margin-right: 30px;
}
</style>
