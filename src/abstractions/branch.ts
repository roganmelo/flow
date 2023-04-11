import Component from './component'
import Flow from '../flow'
import Track from '../track'

import { BranchSpec } from 'src/types/spec'

abstract class Branch<BranchSpecType extends BranchSpec> {
  constructor(
    protected readonly branchSpec: BranchSpecType,
    protected readonly parentComponent: Component,
    protected readonly branchIndex: number,
    protected readonly flow: Flow
  ) {}

  abstract path(): string[]

  isEquals(branch: Branch<BranchSpecType>) {
    const isTheSameParent = this.parent().isEquals(branch.parent())
    const isTheSameTarget = this.targetTrack().isEquals(branch.targetTrack())

    return isTheSameParent && isTheSameTarget
  }

  spec() {
    return this.branchSpec
  }

  parent<T extends Component>(): T {
    return this.parentComponent as T
  }

  index() {
    return this.branchIndex
  }

  targetTrack(): Track {
    return this.flow.getTrack(this.spec().target) as Track
  }
}

export default Branch
