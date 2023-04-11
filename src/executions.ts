import Branches from './abstractions/branches'
import Execution from './execution'
import Flow from './flow'
import ParallelComponent from './parallel-component'
import { ExecutionSpec } from './types/spec'

class Executions extends Branches<ExecutionSpec, Execution> {
  constructor(
    parallel: ParallelComponent,
    executions: Execution[],
    flow: Flow
  ) {
    super(parallel, executions, flow)
  }

  parallel() {
    return this.parent<ParallelComponent>()
  }

  path() {
    return this.parallel().path()
  }
}

export default Executions
