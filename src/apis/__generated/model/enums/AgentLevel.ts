export const AgentLevel_CONSTANTS = ['FIRST', 'SECOND', 'THIRD'] as const
export type AgentLevel = (typeof AgentLevel_CONSTANTS)[number]
