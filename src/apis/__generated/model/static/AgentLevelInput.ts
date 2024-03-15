import type { AgentLevelName } from '../enums/'

export interface AgentLevelInput {
  tenantId?: string | undefined
  levelName: AgentLevelName
  rate: number
  id?: string | undefined
}
