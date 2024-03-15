import type { AgentLevelName } from '../enums/'

export type AgentDto = {
  /**
   */
  'AgentRepository/COMPLEX_FETCHER': {
    id: string
    createdTime: string
    editedTime: string
    tenantId?: string | undefined
    agentNo: string
    parentId: string
    agentLevel: {
      id: string
      createdTime: string
      editedTime: string
      tenantId?: string | undefined
      levelName: AgentLevelName
      rate: number
    }
    userId: string
    user: {
      id: string
      phone: string
      nickname?: string | undefined
    }
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
