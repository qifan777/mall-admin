<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { reactive, ref, watch } from 'vue'
import { useAgentLevelStore } from '../store/agent-level-store'
import { assertFormValidate, assertSuccess } from '@/utils/common'
import { api } from '@/utils/api-instance'
import FooterButton from '@/components/base/dialog/footer-button.vue'
import DictSelect from '@/components/dict/dict-select.vue'
import type { FormInstance, FormRules } from 'element-plus'
import { DictConstants } from '@/apis/__generated/model/enums/DictConstants'

const agentLevelStore = useAgentLevelStore()
const { closeDialog, reloadTableData } = agentLevelStore
const { createForm, dialogData } = storeToRefs(agentLevelStore)
const createFormRef = ref<FormInstance>()
const rules = reactive<FormRules<typeof createForm>>({})
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
      api.agentLevelController.save({ body: createForm.value }).then(async (res) => {
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
      <el-form-item label="佣金比例" prop="rate">
        <el-input-number v-model="createForm.rate"></el-input-number>
      </el-form-item>
      <el-form-item label="代理等级" prop="levelName">
        <dict-select
          :dict-id="DictConstants.AGENT_LEVEL_NAME"
          v-model="createForm.levelName"
        ></dict-select>
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
