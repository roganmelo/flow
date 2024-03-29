import BranchingComponent from './abstractions/branching-component'
import Component from './abstractions/component'
import Execution from './execution'
import Executions from './executions'
import Flow from './flow'
import { ExecutionSpec, ParallelSpec } from './types/spec'

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
    return this.branches()
      .all()
      .map(branch => branch.targetTrack().name())
  }

  executions() {
    return this.branches()
  }

  executionsTargetsTracksNames() {
    return this.branchesTargetsNames()
  }

  next() {
    const targetComponents = this.executions()
      .all()
      .reduce<Component[]>((acc, execution) => {
        const firstComponent = execution.targetTrack().first()

        return firstComponent ? [...acc, firstComponent] : acc
      }, [])

    return targetComponents
  }
}

export default ParallelComponent
