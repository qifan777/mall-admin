import type { AgentLevelName, WalletRecordType } from '../enums/'

export type AgentRebateRecordDto = {
  /**
   */
  'AgentRebateRecordRepository/COMPLEX_FETCHER': {
    id: string
    createdTime: string
    editedTime: string
    /**
     * 代理人id
     */
    agentId: string
    /**
     * 返佣订单号
     */
    productOrderId: string
    /**
     * 钱包流水号
     */
    walletRecordId: string
    /**
     * 来自第n级的返佣
     */
    fromLevelName: AgentLevelName
    /**
     * 返佣者
     */
    fromAgentId: string
    agent: {
      id: string
      user: {
        id: string
        nickname?: string | undefined
        avatar?: string | undefined
      }
    }
    walletRecord: {
      id: string
      createdTime: string
      editedTime: string
      amount: number
      type: WalletRecordType
      description: string
    }
    fromAgent: {
      id: string
      user: {
        id: string
        nickname?: string | undefined
        avatar?: string | undefined
      }
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
