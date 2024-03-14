export const WalletRecordType_CONSTANTS = ['REBATE', 'RECHARGE', 'WITHDRAW'] as const
export type WalletRecordType = (typeof WalletRecordType_CONSTANTS)[number]
