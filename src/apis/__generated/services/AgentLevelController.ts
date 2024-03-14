import type { Executor } from '../'
import type { AgentLevelDto } from '../model/dto/'
import type { AgentLevelInput, AgentLevelSpec, Page, QueryRequest } from '../model/static/'

export class AgentLevelController {
  constructor(private executor: Executor) {}

  async delete(options: AgentLevelControllerOptions['delete']): Promise<boolean | undefined> {
    const _uri = '/agentLevel/delete'
    return (await this.executor({ uri: _uri, method: 'POST', body: options.body })) as Promise<
      boolean | undefined
    >
  }

  async findById(
    options: AgentLevelControllerOptions['findById']
  ): Promise<AgentLevelDto['AgentLevelRepository/COMPLEX_FETCHER']> {
    let _uri = '/agentLevel/'
    _uri += encodeURIComponent(options.id)
    return (await this.executor({ uri: _uri, method: 'GET' })) as Promise<
      AgentLevelDto['AgentLevelRepository/COMPLEX_FETCHER']
    >
  }

  async query(
    options: AgentLevelControllerOptions['query']
  ): Promise<Page<AgentLevelDto['AgentLevelRepository/COMPLEX_FETCHER']>> {
    const _uri = '/agentLevel/query'
    return (await this.executor({ uri: _uri, method: 'POST', body: options.body })) as Promise<
      Page<AgentLevelDto['AgentLevelRepository/COMPLEX_FETCHER']>
    >
  }

  async save(options: AgentLevelControllerOptions['save']): Promise<string> {
    const _uri = '/agentLevel/save'
    return (await this.executor({
      uri: _uri,
      method: 'POST',
      body: options.body
    })) as Promise<string>
  }
}

export type AgentLevelControllerOptions = {
  findById: {
    id: string
  }
  query: {
    body: QueryRequest<AgentLevelSpec>
  }
  save: {
    body: AgentLevelInput
  }
  delete: {
    body: Array<string>
  }
}
