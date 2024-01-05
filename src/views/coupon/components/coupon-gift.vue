<template>
  <div>
    <el-dialog v-model="visible" append-to-body>
      <user-choose-table ref="userChooseTableRef"></user-choose-table>
      <template #footer>
        <el-button type="primary" @click="handleSubmit"> 确定 </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { api } from '@/utils/api-instance'
import { assertSuccess } from '@/utils/common'
import UserChooseTable from '@/views/user/components/user-choose-table.vue'
import { ref } from 'vue'
const props = defineProps<{ couponId?: string }>()
const visible = ref(false)
const userChooseTableRef = ref<InstanceType<typeof UserChooseTable>>()
const handleSubmit = () => {
  const rows = userChooseTableRef.value?.getTableSelectedRows()
  if (rows && props.couponId) {
    api.couponUserController
      .gift({
        body: { couponId: props.couponId, userIds: rows.map((row) => row.id) }
      })
      .then((res) => {
        assertSuccess(res).then(() => (visible.value = false))
      })
  }
}
const openDialog = () => {
  visible.value = true
}
defineExpose({ openDialog })
</script>

<style lang="scss" scoped></style>
