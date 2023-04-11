import Component from './abstractions/component'
import Flow from './flow'
import Level from './level'
import Track from './track'
import TrackName from './track-name'
import { FlowSpec, LevelComponentSpec, LevelTypes } from './types/spec'
import { Nullable } from './types/utils'

class LevelComponent extends Component<LevelComponentSpec> {
  constructor(spec: LevelComponentSpec, flow: Flow) {
    super(spec, flow)
  }

  next(): Nullable<Component> {
    return this.track().at(this.index() + 1)
  }

  onProcessTrackName() {
    return new TrackName({ id: this.spec().params.onProcess })
  }

  onExceptionTrackName() {
    return new TrackName({ id: this.spec().params.onException })
  }

  onProcessTrack() {
    return this.flow.getTrack(this.onProcessTrackName()) as Track
  }

  onExceptionTrack() {
    return this.flow.getTrack(this.onExceptionTrackName()) as Track
  }

  onProcessLevel() {
    const levelSpec = this.flow
      .tracks()
      .reduce<FlowSpec>((accLevelSpec, currentTrack) => {
        if (currentTrack.isChildOf(this) && currentTrack.isFromOnProcess()) {
          return {
            ...accLevelSpec,
            [currentTrack.name().toString()]: currentTrack.spec()
          }
        }

        return accLevelSpec
      }, {})

    return new Level(levelSpec, LevelTypes.OnProcess, this, this.flow)
  }

  onExceptionLevel() {
    const levelSpec = this.flow
      .tracks()
      .reduce<FlowSpec>((accLevelSpec, currentTrack) => {
        if (currentTrack.isChildOf(this) && currentTrack.isFromOnException()) {
          return {
            ...accLevelSpec,
            [currentTrack.name().toString()]: currentTrack.spec()
          }
        }

        return accLevelSpec
      }, {})

    return new Level(levelSpec, LevelTypes.OnException, this, this.flow)
  }
}

export default LevelComponent
