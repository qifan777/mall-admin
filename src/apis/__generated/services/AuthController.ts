import type { Executor } from '../'
import type { PhonePasswordAuth, SaTokenInfo } from '../model/static/'

export class AuthController {
  constructor(private executor: Executor) {}

  async authByPhonePassword(
    options: AuthControllerOptions['authByPhonePassword']
  ): Promise<SaTokenInfo> {
    const _uri = '/auth/phone-password'
    return (await this.executor({
      uri: _uri,
      method: 'POST',
      body: options.body
    })) as Promise<SaTokenInfo>
  }
}
export type AuthControllerOptions = {
  authByPhonePassword: {
    body: PhonePasswordAuth
  }
}
