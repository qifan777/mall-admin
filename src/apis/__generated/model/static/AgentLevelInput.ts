import type { AgentLevel } from '../enums/'

export interface AgentLevelInput {
  tenantId?: string | undefined
  levelName: AgentLevel
  rate: number
  id?: string | undefined
}
