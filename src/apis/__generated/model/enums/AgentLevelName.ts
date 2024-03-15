export const AgentLevelName_CONSTANTS = ['FIRST', 'SECOND', 'THIRD'] as const
export type AgentLevelName = (typeof AgentLevelName_CONSTANTS)[number]
