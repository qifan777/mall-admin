<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { reactive, ref, watch } from 'vue'
import { useAgentRebateRecordStore } from '../store/agent-rebate-record-store'
import { assertFormValidate, assertSuccess } from '@/utils/common'
import { api } from '@/utils/api-instance'
import FooterButton from '@/components/base/dialog/footer-button.vue'
import DictSelect from '@/components/dict/dict-select.vue'
import type { FormInstance, FormRules } from 'element-plus'
import { DictConstants } from '@/apis/__generated/model/enums/DictConstants'

const agentRebateRecordStore = useAgentRebateRecordStore()
const { closeDialog, reloadTableData } = agentRebateRecordStore
const { updateForm, dialogData } = storeToRefs(agentRebateRecordStore)
const updateFormRef = ref<FormInstance>()
const rules = reactive<FormRules<typeof updateForm>>({
  agentId: [{ required: true, message: '请输入代理人', trigger: 'blur' }],
  productOrderId: [{ required: true, message: '请输入返佣订单号', trigger: 'blur' }],
  walletRecordId: [{ required: true, message: '请输入钱包流水号', trigger: 'blur' }],
  fromAgentId: [{ required: true, message: '请输入返佣者', trigger: 'blur' }]
})
const init = async () => {
  dialogData.value.title = '编辑'
  updateForm.value = {
    ...(await api.agentRebateRecordController.findById({ id: updateForm.value.id || '' }))
  }
}
watch(
  () => dialogData.value.visible,
  (value) => {
    if (value) {
      init()
    }
  },
  { immediate: true }
)
const handleConfirm = () => {
  updateFormRef.value?.validate(
    assertFormValidate(() => {
      api.agentRebateRecordController.save({ body: updateForm.value }).then(async (res) => {
        assertSuccess(res).then(() => {
          closeDialog()
          reloadTableData()
        })
      })
    })
  )
}
</script>
<template>
  <div class="update-form">
    <el-form labelWidth="120" class="form" ref="updateFormRef" :model="updateForm" :rules="rules">
      <el-form-item label="代理人" prop="agentId">
        <el-input v-model="updateForm.agentId"></el-input>
      </el-form-item>
      <el-form-item label="返佣订单号" prop="productOrderId">
        <el-input v-model="updateForm.productOrderId"></el-input>
      </el-form-item>
      <el-form-item label="钱包流水号" prop="walletRecordId">
        <el-input v-model="updateForm.walletRecordId"></el-input>
      </el-form-item>
      <el-form-item label="返佣者" prop="fromAgentId">
        <el-input v-model="updateForm.fromAgentId"></el-input>
      </el-form-item>
      <el-form-item label="来自第n级的返佣" prop="fromLevelName">
        <dict-select
          :dict-id="DictConstants.AGENT_LEVEL_NAME"
          v-model="updateForm.fromLevelName"
        ></dict-select>
      </el-form-item>
    </el-form>
    <footer-button @close="closeDialog" @confirm="handleConfirm"></footer-button>
  </div>
</template>

<style lang="scss" scoped>
.update-form {
  margin-right: 30px;
}
</style>
