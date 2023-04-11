import Component from './abstractions/component'
import Flow from './flow'
import { CapsuleSpec } from './types/spec'
import { Nullable } from './types/utils'

class CapsuleComponent extends Component {
  constructor(spec: CapsuleSpec, flow: Flow) {
    super(spec, flow)
  }

  next(): Nullable<Component> {
    // const track = this.track()
    // const nextInCurrentTrack = track.at(this.index() + 1)

    // return nextInCurrentTrack
    throw new Error('Method not implemented.')
  }
}

export default CapsuleComponent
