<script lang="ts" setup>
import { type Component } from 'vue'
import { storeToRefs } from 'pinia'
import { useAgentStore } from '../store/agent-store'
import AgentCreateForm from './agent-create-form.vue'
import AgentUpdateForm from './agent-update-form.vue'
import type { EditMode } from '@/typings'

const agentStore = useAgentStore()
const { dialogData } = storeToRefs(agentStore)

const formMap: Record<EditMode, Component> = {
  CREATE: AgentCreateForm,
  UPDATE: AgentUpdateForm
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
