import Component from './component'
import Flow from './flow'
import { ComponentSpec } from './spec'
import Track from './track'
import TrackName from './track-name'
import { Nullable } from './types'

class CommonComponent extends Component<ComponentSpec> {
  constructor(spec: ComponentSpec, flow: Flow) {
    super(spec, flow)
  }

  next(): Nullable<Component> {
    return this.track().at(this.index() + 1)
  }

  connect(to: Component | TrackName | Track): Flow {
    return this.track().connect(to)
  }

  // disconnect(): Flow {
  //   const next = this.next()

  //   if (!next) return this.flow

  //   return this.track().disconnect(next)
  // }

  // remove(): Flow {}
}

export default CommonComponent
