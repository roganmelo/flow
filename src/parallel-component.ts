import BranchingComponent from './branching-component'
import Component from './component'
import Execution from './execution'
import Executions from './executions'
import Flow from './flow'
import { ExecutionSpec, ParallelSpec } from './spec'

class ParallelComponent extends BranchingComponent<
  ParallelSpec,
  ExecutionSpec,
  Execution,
  Executions
> {
  constructor(spec: ParallelSpec, flow: Flow) {
    super(spec, flow)
  }

  branches() {
    const executions = this.spec().params.parallelExecutions.map(
      (currentExecution, index) =>
        new Execution(currentExecution, this, index, this.flow)
    )

    return new Executions(this, executions, this.flow)
  }

  branchesTargetsNames() {
    return this.branches().map(branch => branch.targetTrack().name())
  }

  executions() {
    return this.branches()
  }

  executionsTargetsTracksNames() {
    return this.branchesTargetsNames()
  }

  next() {
    const targetComponents = this.executions().reduce<Component[]>(
      (acc, execution) => {
        const firstComponent = execution.targetTrack().first()

        return firstComponent ? [...acc, firstComponent] : acc
      },
      []
    )

    return targetComponents
  }
}

export default ParallelComponent
