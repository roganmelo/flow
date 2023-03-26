import Branch from './branch'
import Flow from './flow'
import ParallelComponent from './parallel-component'
import { ExecutionSpec } from './spec'

class Execution extends Branch<ExecutionSpec> {
  constructor(
    executionSpec: ExecutionSpec,
    parallelComponent: ParallelComponent,
    executionIndex: number,
    flow: Flow
  ) {
    super(executionSpec, parallelComponent, executionIndex, flow)
  }

  parallel(): ParallelComponent {
    return this.parent<ParallelComponent>()
  }

  executionId() {
    return this.spec().executionId
  }

  description() {
    return this.spec().description
  }

  path() {
    const parallelPath = this.parallel().path()
    const index = this.index().toString()

    // return [...parallelPath, 'params', 'parallelExecutions', index]
    return [...parallelPath, index]
  }
}

export default Execution