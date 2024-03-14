import { defineStore } from 'pinia'
import { useTableHelper } from '@/components/base/table/table-helper'
import { useDialogHelper } from '@/components/base/dialog/dialog-helper'
import { useQueryHelper } from '@/components/base/query/query-helper'
import type { AgentLevelInput, AgentLevelSpec } from '@/apis/__generated/model/static'
import { api } from '@/utils/api-instance'
import { ref } from 'vue'

export const useAgentLevelStore = defineStore('agentLevel', () => {
  const initQuery: AgentLevelSpec = {}
  const initForm: AgentLevelInput = {
    levelName: 'FIRST',
    rate: 0
  }
  const tableHelper = useTableHelper(
    api.agentLevelController.query,
    api.agentLevelController,
    initQuery
  )
  const dialogHelper = useDialogHelper()
  const queryHelper = useQueryHelper<AgentLevelSpec>(initQuery)
  const updateForm = ref<AgentLevelInput>({ ...initForm })
  const createForm = ref<AgentLevelInput>({ ...initForm })
  return { ...tableHelper, ...dialogHelper, ...queryHelper, updateForm, createForm, initForm }
})
