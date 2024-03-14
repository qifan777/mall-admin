import type { Executor } from '../'
import type { WalletRecordDto } from '../model/dto/'
import type { Page, QueryRequest, WalletRecordInput, WalletRecordSpec } from '../model/static/'

export class WalletRecordController {
  constructor(private executor: Executor) {}

  async delete(options: WalletRecordControllerOptions['delete']): Promise<boolean | undefined> {
    const _uri = '/walletRecord/delete'
    return (await this.executor({ uri: _uri, method: 'POST', body: options.body })) as Promise<
      boolean | undefined
    >
  }

  async findById(
    options: WalletRecordControllerOptions['findById']
  ): Promise<WalletRecordDto['WalletRecordRepository/COMPLEX_FETCHER']> {
    let _uri = '/walletRecord/'
    _uri += encodeURIComponent(options.id)
    return (await this.executor({ uri: _uri, method: 'GET' })) as Promise<
      WalletRecordDto['WalletRecordRepository/COMPLEX_FETCHER']
    >
  }

  async query(
    options: WalletRecordControllerOptions['query']
  ): Promise<Page<WalletRecordDto['WalletRecordRepository/COMPLEX_FETCHER']>> {
    const _uri = '/walletRecord/query'
    return (await this.executor({ uri: _uri, method: 'POST', body: options.body })) as Promise<
      Page<WalletRecordDto['WalletRecordRepository/COMPLEX_FETCHER']>
    >
  }

  async save(options: WalletRecordControllerOptions['save']): Promise<string> {
    const _uri = '/walletRecord/save'
    return (await this.executor({
      uri: _uri,
      method: 'POST',
      body: options.body
    })) as Promise<string>
  }
}

export type WalletRecordControllerOptions = {
  findById: {
    id: string
  }
  query: {
    body: QueryRequest<WalletRecordSpec>
  }
  save: {
    body: WalletRecordInput
  }
  delete: {
    body: Array<string>
  }
}
