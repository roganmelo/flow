import Branch from './branch'
import Component from './component'
import Flow from './flow'
import { BranchSpec } from './spec'
import TrackName from './track-name'
import { Nullable } from './types'

abstract class Branches<
  BranchSpecType extends BranchSpec,
  BranchType extends Branch<BranchSpecType>
> {
  constructor(
    protected readonly parentComponent: Component,
    protected readonly branches: BranchType[],
    protected readonly flow: Flow
  ) {}

  abstract path(): string[]

  parent<T extends Component>(): T {
    return this.parentComponent as T
  }

  all() {
    return this.branches
  }

  at(index: number): Nullable<BranchType> {
    return this.all()[index]
  }

  length() {
    return this.all().length
  }

  first() {
    return this.at(0)
  }

  last() {
    return this.at(this.all().length - 1)
  }

  getByTrackName(trackName: string | TrackName) {
    return this.all().find(branch =>
      branch.targetTrack().name().isEquals(trackName)
    )
  }
}

export default Branches
