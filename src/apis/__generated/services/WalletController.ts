import type { Executor } from '../'
import type { WalletDto } from '../model/dto/'
import type { Page, QueryRequest, WalletInput, WalletSpec } from '../model/static/'

export class WalletController {
  constructor(private executor: Executor) {}

  async delete(options: WalletControllerOptions['delete']): Promise<boolean | undefined> {
    const _uri = '/wallet/delete'
    return (await this.executor({ uri: _uri, method: 'POST', body: options.body })) as Promise<
      boolean | undefined
    >
  }

  async findById(
    options: WalletControllerOptions['findById']
  ): Promise<WalletDto['WalletRepository/COMPLEX_FETCHER']> {
    let _uri = '/wallet/'
    _uri += encodeURIComponent(options.id)
    return (await this.executor({ uri: _uri, method: 'GET' })) as Promise<
      WalletDto['WalletRepository/COMPLEX_FETCHER']
    >
  }

  async query(
    options: WalletControllerOptions['query']
  ): Promise<Page<WalletDto['WalletRepository/COMPLEX_FETCHER']>> {
    const _uri = '/wallet/query'
    return (await this.executor({ uri: _uri, method: 'POST', body: options.body })) as Promise<
      Page<WalletDto['WalletRepository/COMPLEX_FETCHER']>
    >
  }

  async save(options: WalletControllerOptions['save']): Promise<string> {
    const _uri = '/wallet/save'
    return (await this.executor({
      uri: _uri,
      method: 'POST',
      body: options.body
    })) as Promise<string>
  }
}

export type WalletControllerOptions = {
  findById: {
    id: string
  }
  query: {
    body: QueryRequest<WalletSpec>
  }
  save: {
    body: WalletInput
  }
  delete: {
    body: Array<string>
  }
}
