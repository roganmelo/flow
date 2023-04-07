import BranchingComponent from './branching-component'
import Component from './component'
import Condition from './condition'
import Conditions from './conditions'
import Flow from './flow'
import { ChoiceSpec, ConditionSpec, ConditionTypes } from './spec'

class ChoiceComponent extends BranchingComponent<
  ChoiceSpec,
  ConditionSpec,
  Condition,
  Conditions
> {
  constructor(spec: ChoiceSpec, flow: Flow) {
    super(spec, flow)
  }

  branches() {
    const { when, otherwise } = this.spec()
    const createCondition = (spec: ConditionSpec, index: number) =>
      new Condition(spec, this, index, this.flow)
    const whensConditions = when.map((when, index) =>
      createCondition({ type: ConditionTypes.When, ...when }, index)
    )
    const lastIndex = whensConditions.length
    const otherwiseCondition = otherwise
      ? createCondition(
          { type: ConditionTypes.Otherwise, target: otherwise },
          lastIndex
        )
      : undefined
    const conditions = otherwiseCondition
      ? [...whensConditions, otherwiseCondition]
      : whensConditions

    return new Conditions(this, conditions, this.flow)
  }

  branchesTargetsNames() {
    return this.branches()
      .all()
      .map(branch => branch.targetTrack().name())
  }

  conditions() {
    return this.branches()
  }

  conditionsTargetsTracksNames() {
    return this.branchesTargetsNames()
  }

  next() {
    const targetComponents = this.conditions()
      .all()
      .reduce<Component[]>((acc, condition) => {
        const firstComponent = condition.targetTrack().first()

        return firstComponent ? [...acc, firstComponent] : acc
      }, [])

    return targetComponents
  }

  // Mutations

  // connect(to: string | Track | TrackName | Component<ComponentSpec>): Flow {
  //   throw new Error('Method not implemented.')
  // }

  // disconnect(
  //   from?: string | Track | TrackName | Component<ComponentSpec>
  // ): Flow {
  //   throw new Error('Method not implemented.')
  // }
}

export default ChoiceComponent
