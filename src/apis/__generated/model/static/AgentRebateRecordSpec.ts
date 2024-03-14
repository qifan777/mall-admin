import type { AgentLevel } from '../enums/'
import type { AgentRebateRecordSpec_TargetOf_agent } from './'

export interface AgentRebateRecordSpec {
  fromLevel?: AgentLevel | undefined
  walletRecordId?: string | undefined
  agentId?: string | undefined
  orderId?: string | undefined
  id?: string | undefined
  minCreatedTime?: string | undefined
  maxCreatedTime?: string | undefined
  minEditedTime?: string | undefined
  maxEditedTime?: string | undefined
  agent?: AgentRebateRecordSpec_TargetOf_agent | undefined
}
