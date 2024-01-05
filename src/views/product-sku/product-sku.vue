<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { assertFormValidate } from '@/utils/common'
import type { FormInstance, FormRules } from 'element-plus'
import type { ProductAttributeInput, ProductSkuInput } from '@/apis/__generated/model/static'
import type { Scope } from '@/typings'
import FooterButton from '@/components/base/dialog/footer-button.vue'
import ImageUpload from '@/components/image/image-upload.vue'
type ProductAttribute = ProductAttributeInput
type ProductSku = ProductSkuInput & {
  valueList: string[]
  [index: string]: string | string[] | number
}
type ProductSkuScope = Scope<ProductSku>

const props = withDefaults(
  defineProps<{
    attributes: ProductAttribute[]
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
const initSku = {
  valueList: [],
  cover: '',
  description: '',
  name: '',
  price: 0,
  stock: 0,
  values: ''
}
const skuArray = ref<ProductSku[]>([])
// 递归排列组合
const deep = (sku: ProductSku, depth: number, attrList: ProductAttribute[]) => {
  if (attrList.length === 0) {
    return
  }
  if (depth === attrList.length) {
    sku.values = sku.valueList.join(',')
    skuArray.value.push({ ...sku })
    return
  }
  const attribute = attrList[depth]
  if (attribute.values.length === 0) return
  // 获取每个属性的值(选择的)，将各个属性的值进行组合
  const attrValues = attribute.values.split(',')
  attrValues.forEach((value) => {
    // sku对象新增字段，字段的名字是属性的名字。比如 {"糖份"："多糖"}
    sku[attribute.name] = value
    // 加入当前属性的参数
    sku.valueList.push(value)
    // 获取下一个属性的参数
    deep(sku, depth + 1, attrList)
    // 弹出当前属性的参数，准备加入当前属性的下一个参数
    sku.valueList.pop()
  })
}
watch(
  () => props.attributes,
  (value, oldValue) => {
    // 第一次加载时使用默认的skuList不需要重新生成
    if (oldValue.length === 0 && props.skuList.length > 0) {
      skuArray.value = props.skuList.map((sku) => {
        const row: ProductSku = {
          ...sku,
          valueList: sku.values.split(',')
        }
        sku.values.split(',').forEach((attrValue, index) => {
          row[props.attributes[index].name] = attrValue
        })
        return row
      })
      return
    }
    // 当属性修改时重新生成skuList
    skuArray.value = []
    deep({ ...initSku }, 0, props.attributes)
    emit('update:skuList', skuArray.value)
  },
  { deep: true }
)
const handleEdit = (row: ProductSku) => {
  updateForm.value = { ...row }
  visible.value = true
}

// 编辑SKU
const visible = ref(false)
const updateForm = ref<ProductSku>({ ...initSku })
const updateFormRef = ref<FormInstance>()
const rules = reactive<FormRules<typeof updateForm>>({
  values: [{ required: true, message: '请输入属性值组合', trigger: 'blur' }],
  name: [{ required: true, message: '请输入Sku名称', trigger: 'blur' }],
  cover: [{ required: true, message: '请输入封面', trigger: 'blur' }],
  stock: [{ required: true, message: '请输入库存', trigger: 'blur' }],
  description: [{ required: true, message: '请输入描述', trigger: 'blur' }]
})
const handleConfirm = () => {
  updateFormRef.value?.validate(
    assertFormValidate(() => {
      const index = skuArray.value.findIndex((row) => row.values === updateForm.value.values)
      if (index >= 0) {
        skuArray.value[index] = updateForm.value
      }
      emit('update:skuList', skuArray.value)
      visible.value = false
    })
  )
}
</script>
<template>
  <div class="create-form">
    <el-dialog width="800" appendToBody v-model="visible">
      <div class="update-form">
        <el-form
          labelWidth="120"
          class="form"
          ref="updateFormRef"
          :model="updateForm"
          :rules="rules"
        >
          <el-form-item label="Sku名称" prop="name">
            <el-input v-model="updateForm.name"></el-input>
          </el-form-item>
          <el-form-item label="封面" prop="cover">
            <image-upload v-model="updateForm.cover"></image-upload>
          </el-form-item>
          <el-form-item label="价格" prop="price">
            <el-input-number v-model="updateForm.price"></el-input-number>
          </el-form-item>
          <el-form-item label="库存" prop="stock">
            <el-input-number v-model="updateForm.stock"></el-input-number>
          </el-form-item>
          <el-form-item label="描述" prop="description">
            <el-input v-model="updateForm.description"></el-input>
          </el-form-item>
        </el-form>
        <FooterButton :showClose="false" @confirm="handleConfirm"></FooterButton></div
    ></el-dialog>
  </div>

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
    <!-- <el-table-column
      label="属性值组合"
      prop="values"
      sortable="custom"
      min-width="120"
      show-overflow-tooltip
    >
      <template v-slot:default="{ row }: ProductSkuScope">
        {{ row.values }}
      </template>
    </el-table-column> -->
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
    <el-table-column label="操作" fixed="right" width="{280}">
      <template v-slot:default="{ row }: ProductSkuScope">
        <div>
          <el-button class="edit-btn" link size="small" type="primary" @click="handleEdit(row)">
            <el-icon>
              <edit />
            </el-icon>
          </el-button>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<style lang="scss" scoped>
.create-form {
  margin-right: 30px;
}
</style>
