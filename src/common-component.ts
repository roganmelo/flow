import Component from './abstractions/component'
import Flow from './flow'
// import Track from './track'
// import TrackName from './track-name'
import { ComponentSpec } from './types/spec'
import { Nullable } from './types/utils'

class CommonComponent extends Component<ComponentSpec> {
  constructor(spec: ComponentSpec, flow: Flow) {
    super(spec, flow)
  }

  next(): Nullable<Component> {
    return this.track().at(this.index() + 1)
  }

  // connect(to: Component | TrackName | Track): Flow {
  //   return this.track().connect(to)
  // }

  // disconnect(): Flow {
  //   const next = this.next()

  //   if (!next) return this.flow

  //   return this.track().disconnect(next)
  // }

  // remove(): Flow {}
}

export default CommonComponent
