import { BranchSpec } from './branch-spec'
import { ConditionTypes } from './condition-types'

export type ConditionSpec = BranchSpec & {
  type: ConditionTypes
  [key: string]: unknown
}
