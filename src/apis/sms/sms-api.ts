import { http } from '@/utils/api-instance'

export const sendSMS = (phone: string) => {
  return http({ url: '/sms/send?phone=' + phone, method: 'post' })
}
