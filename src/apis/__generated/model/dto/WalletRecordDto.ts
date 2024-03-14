import type { WalletRecordType } from '../enums/'

export type WalletRecordDto = {
  /**
   */
  'WalletRecordRepository/COMPLEX_FETCHER': {
    id: string
    createdTime: string
    editedTime: string
    amount: number
    type: WalletRecordType
    description: string
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
