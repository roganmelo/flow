import Component from './component'
import { FlowSpec } from './spec'
import Track, { TrackName } from './track'
import { Nullish } from './types'

class Flow {
  private readonly cache = new Map<string, Component | Track | Nullish>()

  constructor(private readonly flowSpec: FlowSpec) {}

  spec(): FlowSpec {
    return this.flowSpec
  }

  tracksNames() {
    return Object.keys(this.flowSpec)
  }

  hasTrack(trackOrTrackName: string | Track | TrackName) {
    if (typeof trackOrTrackName === 'string') {
      return trackOrTrackName in this.flowSpec
    }

    if (trackOrTrackName instanceof TrackName) {
      return trackOrTrackName.toString() in this.flowSpec
    }

    return trackOrTrackName.name().toString() in this.flowSpec
  }
}

export default Flow
