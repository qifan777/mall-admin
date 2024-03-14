import type { AgentInput_TargetOf_agentLevel } from './'

export interface AgentInput {
  tenantId?: string | undefined
  agentNo: string
  parentId: string
  id?: string | undefined
  userId: string
  agentLevel: AgentInput_TargetOf_agentLevel
}
