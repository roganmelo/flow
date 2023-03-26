import Branch from './branch'
import ChoiceComponent from './choice-component'
import Flow from './flow'
import { ConditionSpec } from './spec'

class Condition extends Branch<ConditionSpec> {
  constructor(
    conditionSpec: ConditionSpec,
    choiceComponent: ChoiceComponent,
    conditionIndex: number,
    flow: Flow
  ) {
    super(conditionSpec, choiceComponent, conditionIndex, flow)
  }

  type() {
    return this.spec().type
  }

  choice(): ChoiceComponent {
    return this.parent<ChoiceComponent>()
  }

  isWhen() {
    return this.type() === 'when'
  }

  isOtherwise() {
    return this.type() === 'otherwise'
  }

  path() {
    const choicePath = this.choice().path()

    if (this.isOtherwise()) return [...choicePath, 'otherwise']

    return [...choicePath, 'when', this.index().toString()]
  }
}

export default Condition
