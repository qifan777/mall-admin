import type { AgentLevel } from '../enums/'

export type AgentLevelDto = {
  /**
   */
  'AgentLevelRepository/COMPLEX_FETCHER': {
    id: string
    createdTime: string
    editedTime: string
    tenantId?: string | undefined
    levelName: AgentLevel
    rate: number
    creator: {
      id: string
      phone: string
      nickname?: string | undefined
    }
    editor: {
      id: string
      phone: string
      nickname?: string | undefined
    }
  }
}
