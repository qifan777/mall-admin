import { defineStore } from 'pinia'
import { useTableHelper } from '@/components/base/table/table-helper'
import { useDialogHelper } from '@/components/base/dialog/dialog-helper'
import { useQueryHelper } from '@/components/base/query/query-helper'
import type { AgentRebateRecordInput, AgentRebateRecordSpec } from '@/apis/__generated/model/static'
import { api } from '@/utils/api-instance'
import { ref } from 'vue'

export const useAgentRebateRecordStore = defineStore('agentRebateRecord', () => {
  const initQuery: AgentRebateRecordSpec = { agent: {}, fromAgent: {} }
  const initForm: AgentRebateRecordInput = {
    agentId: '',
    fromAgentId: '',
    fromLevelName: 'FIRST',
    productOrderId: '',
    walletRecordId: ''
  }
  const tableHelper = useTableHelper(
    api.agentRebateRecordController.query,
    api.agentRebateRecordController,
    initQuery
  )
  const dialogHelper = useDialogHelper()
  const queryHelper = useQueryHelper<AgentRebateRecordSpec>(initQuery)
  const updateForm = ref<AgentRebateRecordInput>({ ...initForm })
  const createForm = ref<AgentRebateRecordInput>({ ...initForm })
  return { ...tableHelper, ...dialogHelper, ...queryHelper, updateForm, createForm, initForm }
})
