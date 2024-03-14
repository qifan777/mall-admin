import type { WalletRecordType } from '../enums/'

export interface WalletRecordInput {
  amount: number
  type: WalletRecordType
  description: string
  id?: string | undefined
}
