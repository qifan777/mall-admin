import type { AgentLevel } from '../enums/'

export interface AgentLevelSpec {
  levelName?: AgentLevel | undefined
  rate?: number | undefined
  tenantId?: string | undefined
  id?: string | undefined
  minCreatedTime?: string | undefined
  maxCreatedTime?: string | undefined
  minEditedTime?: string | undefined
  maxEditedTime?: string | undefined
}
