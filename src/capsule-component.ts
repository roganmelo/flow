import Component from './component'
import Flow from './flow'
import { CapsuleSpec } from './spec'
import { Nullable } from './types'

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
