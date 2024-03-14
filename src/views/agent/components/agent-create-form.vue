<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { reactive, ref, watch } from 'vue'
import { useAgentStore } from '../store/agent-store'
import { assertFormValidate, assertSuccess } from '@/utils/common'
import { api } from '@/utils/api-instance'
import FooterButton from '@/components/base/dialog/footer-button.vue'
import DictSelect from '@/components/dict/dict-select.vue'
import type { FormInstance, FormRules } from 'element-plus'
import { DictConstants } from '@/apis/__generated/model/enums/DictConstants'
import { userLabelProp, userQueryOptions } from '@/views/user/store/user-store'
import RemoteSelect from '@/components/base/form/remote-select.vue'

const agentStore = useAgentStore()
const { closeDialog, reloadTableData } = agentStore
const { createForm, dialogData } = storeToRefs(agentStore)
const createFormRef = ref<FormInstance>()
const rules = reactive<FormRules<typeof createForm>>({
  agentNo: [{ required: true, message: '请输入代理商编号', trigger: 'blur' }]
})
const init = async () => {
  dialogData.value.title = '创建'
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
  createFormRef.value?.validate(
    assertFormValidate(() =>
      api.agentController.save({ body: createForm.value }).then(async (res) => {
        assertSuccess(res).then(() => {
          closeDialog()
          reloadTableData()
        })
      })
    )
  )
}
</script>
<template>
  <div class="create-form">
    <el-form labelWidth="120" class="form" ref="createFormRef" :model="createForm" :rules="rules">
      <el-form-item label="用户id" prop="userId">
        <remote-select
          v-model="createForm.userId"
          :label-prop="userLabelProp"
          :query-options="userQueryOptions"
        ></remote-select>
      </el-form-item>
      <el-form-item label="代理等级" prop="agentLevel.name">
        <dict-select
          :dict-id="DictConstants.AGENT_LEVEL"
          v-model="createForm.agentLevel.levelName"
        ></dict-select>
      </el-form-item>
      <el-form-item label="代理商编号" prop="agentNo">
        <el-input v-model="createForm.agentNo"></el-input>
      </el-form-item>
    </el-form>
    <footer-button @close="closeDialog" @confirm="handleConfirm"></footer-button>
  </div>
</template>

<style lang="scss" scoped>
.create-form {
  margin-right: 30px;
}
</style>
