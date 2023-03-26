import Component from './component'
import Flow from './flow'
import { ComponentSpec } from './spec'
import { Nullable } from './types'

class CommonComponent extends Component {
  constructor(spec: ComponentSpec, flow: Flow) {
    super(spec, flow)
  }

  next(): Nullable<Component> {
    return this.track().at(this.index() + 1)
  }
}

export default CommonComponent
