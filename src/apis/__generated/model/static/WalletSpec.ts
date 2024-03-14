export interface WalletSpec {
  balance?: number | undefined
  password?: string | undefined
  id?: string | undefined
  minEditedTime?: string | undefined
  maxEditedTime?: string | undefined
  minCreatedTime?: string | undefined
  maxCreatedTime?: string | undefined
}
