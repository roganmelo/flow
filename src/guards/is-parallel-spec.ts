import { ComponentSpec, ParallelSpec } from 'src/spec'

export const isParallelSpec = (spec: ComponentSpec): spec is ParallelSpec =>
  spec.type === 'connector' && spec.name === 'parallel-execution-connector'

export default isParallelSpec
