<script lang="ts" setup>
import { type Component } from 'vue'
import { storeToRefs } from 'pinia'
import { useAgentLevelStore } from '../store/agent-level-store'
import AgentLevelCreateForm from './agent-level-create-form.vue'
import AgentLevelUpdateForm from './agent-level-update-form.vue'
import type { EditMode } from '@/typings'

const agentLevelStore = useAgentLevelStore()
const { dialogData } = storeToRefs(agentLevelStore)

const formMap: Record<EditMode, Component> = {
  CREATE: AgentLevelCreateForm,
  UPDATE: AgentLevelUpdateForm
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
