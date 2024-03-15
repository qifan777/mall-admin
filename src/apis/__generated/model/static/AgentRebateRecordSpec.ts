import type { AgentLevelName } from '../enums/'
import type {
  AgentRebateRecordSpec_TargetOf_agent,
  AgentRebateRecordSpec_TargetOf_fromAgent
} from './'

/**
 * Entity for table "agent_rebate_record"
 */
export interface AgentRebateRecordSpec {
  id?: string | undefined
  /**
   * 来自第n级的返佣
   */
  fromLevelName?: AgentLevelName | undefined
  minCreatedTime?: string | undefined
  maxCreatedTime?: string | undefined
  minEditedTime?: string | undefined
  maxEditedTime?: string | undefined
  agent?: AgentRebateRecordSpec_TargetOf_agent | undefined
  fromAgent?: AgentRebateRecordSpec_TargetOf_fromAgent | undefined
  /**
   * 钱包流水号
   */
  walletRecordId?: string | undefined
  /**
   * 返佣订单号
   */
  productOrderId?: string | undefined
}
