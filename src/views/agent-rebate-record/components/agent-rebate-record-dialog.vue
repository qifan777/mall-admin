<script lang="ts" setup>
import { type Component } from 'vue'
import { storeToRefs } from 'pinia'
import { useAgentRebateRecordStore } from '../store/agent-rebate-record-store'
import AgentRebateRecordCreateForm from './agent-rebate-record-create-form.vue'
import AgentRebateRecordUpdateForm from './agent-rebate-record-update-form.vue'
import type { EditMode } from '@/typings'

const agentRebateRecordStore = useAgentRebateRecordStore()
const { dialogData } = storeToRefs(agentRebateRecordStore)

const formMap: Record<EditMode, Component> = {
  CREATE: AgentRebateRecordCreateForm,
  UPDATE: AgentRebateRecordUpdateForm
}
</script>
<template>
  <div>
    <el-dialog v-model="dialogData.visible" :title="dialogData.title" :width="dialogData.width">
      <component :is="formMap[dialogData.mode]"></component>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped></style>
