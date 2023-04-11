import { BranchSpec } from './branch-spec'

export type ExecutionSpec = BranchSpec & {
  description: string
  executionId: string
}
