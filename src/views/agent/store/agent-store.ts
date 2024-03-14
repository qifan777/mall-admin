import { defineStore } from 'pinia'
import { useTableHelper } from '@/components/base/table/table-helper'
import { useDialogHelper } from '@/components/base/dialog/dialog-helper'
import { useQueryHelper } from '@/components/base/query/query-helper'
import type { AgentInput, AgentSpec } from '@/apis/__generated/model/static'
import { api } from '@/utils/api-instance'
import { ref } from 'vue'

export const useAgentStore = defineStore('agent', () => {
  const initQuery: AgentSpec = { agentLevel: {} }
  const initForm: AgentInput = {
    agentNo: '',
    parentId: '',
    userId: '',
    agentLevel: {
      levelName: 'FIRST'
    }
  }
  const tableHelper = useTableHelper(api.agentController.query, api.agentController, initQuery)
  const dialogHelper = useDialogHelper()
  const queryHelper = useQueryHelper<AgentSpec>(initQuery)
  const updateForm = ref<AgentInput>({ ...initForm })
  const createForm = ref<AgentInput>({ ...initForm })
  return { ...tableHelper, ...dialogHelper, ...queryHelper, updateForm, createForm, initForm }
})
