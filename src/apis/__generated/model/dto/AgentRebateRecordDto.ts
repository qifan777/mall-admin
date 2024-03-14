import type { AgentLevel } from '../enums/'

export type AgentRebateRecordDto = {
  /**
   */
  'AgentRebateRecordRepository/COMPLEX_FETCHER': {
    id: string
    createdTime: string
    editedTime: string
    fromLevel: AgentLevel
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
