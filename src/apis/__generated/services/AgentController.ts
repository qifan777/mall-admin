import type { Executor } from '../'
import type { AgentDto } from '../model/dto/'
import type { AgentInput, AgentSpec, Page, QueryRequest } from '../model/static/'

export class AgentController {
  constructor(private executor: Executor) {}

  async delete(options: AgentControllerOptions['delete']): Promise<boolean | undefined> {
    const _uri = '/agent/delete'
    return (await this.executor({ uri: _uri, method: 'POST', body: options.body })) as Promise<
      boolean | undefined
    >
  }

  async findById(
    options: AgentControllerOptions['findById']
  ): Promise<AgentDto['AgentRepository/COMPLEX_FETCHER']> {
    let _uri = '/agent/'
    _uri += encodeURIComponent(options.id)
    return (await this.executor({ uri: _uri, method: 'GET' })) as Promise<
      AgentDto['AgentRepository/COMPLEX_FETCHER']
    >
  }

  async query(
    options: AgentControllerOptions['query']
  ): Promise<Page<AgentDto['AgentRepository/COMPLEX_FETCHER']>> {
    const _uri = '/agent/query'
    return (await this.executor({ uri: _uri, method: 'POST', body: options.body })) as Promise<
      Page<AgentDto['AgentRepository/COMPLEX_FETCHER']>
    >
  }

  async save(options: AgentControllerOptions['save']): Promise<string> {
    const _uri = '/agent/save'
    return (await this.executor({
      uri: _uri,
      method: 'POST',
      body: options.body
    })) as Promise<string>
  }
}

export type AgentControllerOptions = {
  findById: {
    id: string
  }
  query: {
    body: QueryRequest<AgentSpec>
  }
  save: {
    body: AgentInput
  }
  delete: {
    body: Array<string>
  }
}
