import Branches from './branches'
import ChoiceComponent from './choice-component'
import Condition from './condition'
import Flow from './flow'
import { ConditionSpec } from './spec'

class Conditions extends Branches<ConditionSpec, Condition> {
  constructor(choice: ChoiceComponent, conditions: Condition[], flow: Flow) {
    super(choice, conditions, flow)
  }

  choice() {
    const choice = this.parent<ChoiceComponent>()

    return choice
  }

  whens() {
    const whenConditions = this.all().filter(condition => condition.isWhen())

    return new Conditions(this.choice(), whenConditions, this.flow)
  }

  otherwise() {
    const condition = this.all().find(condition => condition.isOtherwise())

    return condition
  }

  path() {
    return this.choice().path()
  }
}

export default Conditions
