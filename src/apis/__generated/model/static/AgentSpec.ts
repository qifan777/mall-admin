import type { AgentSpec_TargetOf_agentLevel } from './'

export interface AgentSpec {
  tenantId?: string | undefined
  parentId?: string | undefined
  agentNo?: string | undefined
  id?: string | undefined
  minCreatedTime?: string | undefined
  maxCreatedTime?: string | undefined
  minEditedTime?: string | undefined
  maxEditedTime?: string | undefined
  userId?: string | undefined
  agentLevel?: AgentSpec_TargetOf_agentLevel | undefined
}
