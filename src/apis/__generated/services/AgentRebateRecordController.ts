import type { Executor } from '../'
import type { AgentRebateRecordDto } from '../model/dto/'
import type {
  AgentRebateRecordInput,
  AgentRebateRecordSpec,
  Page,
  QueryRequest
} from '../model/static/'

export class AgentRebateRecordController {
  constructor(private executor: Executor) {}

  async delete(
    options: AgentRebateRecordControllerOptions['delete']
  ): Promise<boolean | undefined> {
    const _uri = '/agentRebateRecord/delete'
    return (await this.executor({ uri: _uri, method: 'POST', body: options.body })) as Promise<
      boolean | undefined
    >
  }

  async findById(
    options: AgentRebateRecordControllerOptions['findById']
  ): Promise<AgentRebateRecordDto['AgentRebateRecordRepository/COMPLEX_FETCHER']> {
    let _uri = '/agentRebateRecord/'
    _uri += encodeURIComponent(options.id)
    return (await this.executor({ uri: _uri, method: 'GET' })) as Promise<
      AgentRebateRecordDto['AgentRebateRecordRepository/COMPLEX_FETCHER']
    >
  }

  async query(
    options: AgentRebateRecordControllerOptions['query']
  ): Promise<Page<AgentRebateRecordDto['AgentRebateRecordRepository/COMPLEX_FETCHER']>> {
    const _uri = '/agentRebateRecord/query'
    return (await this.executor({ uri: _uri, method: 'POST', body: options.body })) as Promise<
      Page<AgentRebateRecordDto['AgentRebateRecordRepository/COMPLEX_FETCHER']>
    >
  }

  async save(options: AgentRebateRecordControllerOptions['save']): Promise<string> {
    const _uri = '/agentRebateRecord/save'
    return (await this.executor({
      uri: _uri,
      method: 'POST',
      body: options.body
    })) as Promise<string>
  }

  async today(
    options: AgentRebateRecordControllerOptions['today']
  ): Promise<Page<AgentRebateRecordDto['AgentRebateRecordRepository/COMPLEX_FETCHER']>> {
    const _uri = '/agentRebateRecord/today'
    return (await this.executor({ uri: _uri, method: 'POST', body: options.body })) as Promise<
      Page<AgentRebateRecordDto['AgentRebateRecordRepository/COMPLEX_FETCHER']>
    >
  }
}

export type AgentRebateRecordControllerOptions = {
  findById: {
    id: string
  }
  query: {
    body: QueryRequest<AgentRebateRecordSpec>
  }
  save: {
    body: AgentRebateRecordInput
  }
  delete: {
    body: Array<string>
  }
  today: {
    body: QueryRequest<AgentRebateRecordSpec>
  }
}
