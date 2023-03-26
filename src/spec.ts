export enum LevelComponentTypes {
  ForEach = 'for-each-connector',
  Retry = 'retry-connector',
  DoWhile = 'do-while-connector',
  StreamExcel = 'stream-excel-connector',
  StreamDB = 'stream-db-connector',
  StreamDBV3 = 'stream-db-connector-v3',
  StreamFileReader = 'stream-file-reader-connector',
  BlockExecution = 'block-execution-connector',
  StreamFileReaderPattern = 'stream-file-reader-pattern-connector',
  StreamJSONFileReader = 'stream-json-file-reader-connector',
  StreamXMLFileReader = 'stream-xml-file-reader-connector'
}

export type ComponentSpec = {
  id: string
  type: string
  name: string
  stepName: string
}

export type BranchSpec = {
  target: string
}

export type ExecutionSpec = BranchSpec & {
  description: string
  executionId: string
}

export type ParallelSpec = ComponentSpec & {
  name: 'parallel-execution-connector'
  type: 'connector'
  params: {
    parallelExecutions: ExecutionSpec[]
    [key: string]: unknown
  }
}

export enum ConditionTypes {
  When = 'when',
  Otherwise = 'otherwise'
}

export type WhenSpec = BranchSpec &
  ({ jsonPath?: string } | { simple?: string })

export type ConditionSpec = BranchSpec & {
  type: ConditionTypes
  [key: string]: unknown
}

export type ChoiceSpec = ComponentSpec & {
  type: 'choice'
  when: WhenSpec[]
  otherwise?: string
}

export enum SubLevelTypes {
  OnProcess = 'onProcess',
  OnException = 'onException'
}

export enum LevelTypes {
  Start = 'start',
  OnProcess = 'onProcess',
  OnException = 'onException'
}

export type LevelComponentSpec = ComponentSpec & {
  name: LevelComponentTypes
  type: 'connector'
  params: {
    onProcess: string
    onException: string
    [key: string]: unknown
  }
}

export type CapsuleSpec = ComponentSpec & {
  type: 'capsule'
}

export type TrackSpec = ComponentSpec[]

export type FlowSpec = {
  [key: string]: TrackSpec
}
