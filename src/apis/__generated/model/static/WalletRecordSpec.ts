import type { WalletRecordType } from '../enums/'

export interface WalletRecordSpec {
  amount?: number | undefined
  type?: WalletRecordType | undefined
  description?: string | undefined
  walletId?: string | undefined
  id?: string | undefined
  minEditedTime?: string | undefined
  maxEditedTime?: string | undefined
  minCreatedTime?: string | undefined
  maxCreatedTime?: string | undefined
}
