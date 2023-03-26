import Branch from './branch'
import Component from './component'
import Flow from './flow'
import { BranchSpec } from './spec'
import { Mapper, Nullable, Predicate, Reducer } from './types'
import TrackName from './value-objects/track-name'

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

  map<T>(mapper: Mapper<BranchType, T>) {
    return this.all().map(mapper)
  }

  filter(predicate: Predicate<BranchType>) {
    return this.all().filter(predicate)
  }

  find(predicate: Predicate<BranchType>) {
    return this.all().find(predicate)
  }

  some(predicate: Predicate<BranchType>) {
    return this.all().some(predicate)
  }

  every(predicate: Predicate<BranchType>) {
    return this.all().every(predicate)
  }

  reduce<T>(reducer: Reducer<BranchType, T>, initial: T) {
    return this.all().reduce(reducer, initial)
  }

  getByTrackName(trackName: string | TrackName) {
    return this.find(branch => branch.targetTrack().name().isEquals(trackName))
  }
}

export default Branches
