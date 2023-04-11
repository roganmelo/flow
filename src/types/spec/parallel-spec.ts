import { ComponentSpec } from './component-spec'
import { ExecutionSpec } from './execution-spec'

export type ParallelSpec = ComponentSpec & {
  name: 'parallel-execution-connector'
  type: 'connector'
  params: {
    parallelExecutions: ExecutionSpec[]
    [key: string]: unknown
  }
}
