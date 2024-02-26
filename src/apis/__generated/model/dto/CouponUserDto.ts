import type { CouponReceiveType, CouponUseStatus } from '../enums/'

export type CouponUserDto = {
  /**
   */
  'CouponUserRepository/COMPLEX_FETCHER': {
    id: string
    createdTime: string
    editedTime: string
    receiveType: CouponReceiveType
    status: CouponUseStatus
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
    coupon: {
      id: string
      name: string
    }
    user: {
      id: string
      nickname?: string | undefined
      phone: string
    }
    couponId: string
    userId: string
  }
}
