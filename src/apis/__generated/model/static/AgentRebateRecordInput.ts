import type { AgentLevelName } from '../enums/'

/**
 * Entity for table "agent_rebate_record"
 */
export interface AgentRebateRecordInput {
  /**
   * 来自第n级的返佣
   */
  fromLevelName: AgentLevelName
  /**
   * 代理人id
   */
  agentId: string
  /**
   * 钱包流水号
   */
  walletRecordId: string
  /**
   * 返佣订单号
   */
  productOrderId: string
  /**
   * 返佣者
   */
  fromAgentId: string
  id?: string | undefined
}
