import Branch from './branch'
import Branches from './branches'
import Component from './component'
import Flow from './flow'
import { BranchSpec, ComponentSpec } from './spec'
import TrackName from './track-name'

abstract class BranchingComponent<
  SpecType extends ComponentSpec,
  BranchSpecType extends BranchSpec,
  BranchType extends Branch<BranchSpecType>,
  BranchesType extends Branches<BranchSpecType, BranchType>
> extends Component<SpecType> {
  constructor(spec: SpecType, flow: Flow) {
    super(spec, flow)
  }

  abstract branches(): BranchesType

  abstract branchesTargetsNames(): TrackName[]
}

export default BranchingComponent
