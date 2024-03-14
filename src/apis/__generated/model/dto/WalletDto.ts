export type WalletDto = {
  /**
   */
  'WalletRepository/COMPLEX_FETCHER': {
    id: string
    createdTime: string
    editedTime: string
    balance: number
    password?: string | undefined
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
