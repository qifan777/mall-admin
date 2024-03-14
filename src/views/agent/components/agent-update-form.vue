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
const { updateForm, dialogData } = storeToRefs(agentStore)
const updateFormRef = ref<FormInstance>()
const rules = reactive<FormRules<typeof updateForm>>({
  agentNo: [{ required: true, message: '请输入代理商编号', trigger: 'blur' }]
})
const init = async () => {
  dialogData.value.title = '编辑'
  const res = await api.agentController.findById({ id: updateForm.value.id || '' })
  updateForm.value = {
    ...res
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
      api.agentController.save({ body: updateForm.value }).then(async (res) => {
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
      <el-form-item label="用户id" prop="userId">
        <remote-select
          v-model="updateForm.userId"
          :label-prop="userLabelProp"
          :query-options="userQueryOptions"
        ></remote-select>
      </el-form-item>
      <el-form-item label="代理等级" prop="agentLevel.name">
        <dict-select
          :dict-id="DictConstants.AGENT_LEVEL"
          v-model="updateForm.agentLevel.levelName"
        ></dict-select>
      </el-form-item>
      <el-form-item label="代理商编号" prop="agentNo">
        <el-input v-model="updateForm.agentNo"></el-input>
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
