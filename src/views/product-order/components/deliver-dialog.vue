<script setup lang="ts">
import { ref } from 'vue'
import { api } from '@/utils/api-instance'
import type { ProductOrderControllerOptions } from '@/apis/__generated/services/ProductOrderController'
import { ElMessage } from 'element-plus'
const props = defineProps<{ id: string }>()
const deliverForm = ref<ProductOrderControllerOptions['deliver']>({ id: '', trackingNumber: '' })
const visible = ref(false)
const handleDeliver = () => {
  deliverForm.value.id = props.id
  api.productOrderController.deliver(deliverForm.value).then(() => {
    ElMessage.success('发货成功')
    visible.value = false
  })
}
</script>

<template>
  <el-button @click="visible = true" size="small" type="primary">发货</el-button>
  <el-dialog v-model="visible" append-to-body width="500">
    <el-form size="small">
      <el-form-item label="物流单号">
        <el-input v-model="deliverForm.trackingNumber"> </el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" size="small" @click="handleDeliver">确认</el-button>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss"></style>
