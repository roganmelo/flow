import { BranchSpec } from './branch-spec'

export type WhenSpec = BranchSpec &
  ({ jsonPath?: string } | { simple?: string })
