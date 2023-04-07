import Component from './component'
import Flow from './flow'
import LevelComponent from './level-component'
import { FlowSpec, LevelTypes } from './spec'
import Track from './track'
import TrackName from './track-name'
import { Nullable } from './types'

class Level {
  private readonly levelName: TrackName

  constructor(
    private readonly levelSpec: FlowSpec,
    private readonly levelType: LevelTypes,
    private readonly parentComponent: Nullable<LevelComponent>,
    private readonly flow: Flow
  ) {
    if (levelType === LevelTypes.Start) {
      this.levelName = new TrackName({ id: LevelTypes.Start })
    } else {
      if (!parentComponent) {
        throw new Error(
          'Parent component is required when level type is not start.'
        )
      }

      const parentComponentId = parentComponent.id()
      const levelName = `${parentComponentId}-${levelType}Track`

      this.levelName = new TrackName({ id: levelName })
    }
  }

  spec() {
    return this.levelSpec
  }

  tracksNames() {
    return Object.keys(this.spec())
  }

  name() {
    return this.levelName
  }

  type() {
    return this.levelType
  }

  isEquals(levelOrLevelName: string | TrackName | Level) {
    const rawTrackName =
      levelOrLevelName instanceof Level
        ? levelOrLevelName.name()
        : levelOrLevelName

    return this.name().isEquals(rawTrackName)
  }

  isChildOf(componentOrComponentId: LevelComponent | string) {
    const parent = this.parent()

    if (!parent) return false

    const componentId =
      componentOrComponentId instanceof LevelComponent
        ? componentOrComponentId.id()
        : componentOrComponentId

    return parent.isEquals(componentId)
  }

  parent() {
    return this.parentComponent
  }

  path() {
    const parent = this.parent()

    if (!parent) return [this.type()]

    return [...parent.path(), this.type()]
  }

  // Tracks

  tracks(): Track[] {
    const tracksNames = this.tracksNames()
    const tracks = tracksNames.map(
      currentTrackName =>
        new Track(
          this.spec()[currentTrackName],
          new TrackName({ id: currentTrackName }),
          this.flow
        )
    )

    return tracks
  }

  mainTrack() {
    return this.getTrack(this.name()) as Track
  }

  disconnectedTracks() {
    return this.tracks().filter(track => track.isDisconnected())
  }

  hasTrack(trackOrTrackName: string | Track | TrackName) {
    const hasTrack = this.tracks().some(currentTrack =>
      currentTrack.isEquals(trackOrTrackName)
    )

    return hasTrack
  }

  getTrack(trackName: string | TrackName) {
    const track = this.tracks().find(currentTrack =>
      currentTrack.isEquals(trackName)
    )

    return track
  }

  // Components

  components() {
    const tracks = this.tracks()
    const components = tracks.reduce<Component[]>(
      (accComponents, currentTrack) => {
        const currentTrackComponents = currentTrack.components()

        return [...accComponents, ...currentTrackComponents]
      },
      []
    ) as Component[]

    return components
  }

  hasComponent(componentOrComponentId: string | Component) {
    return this.tracks().some(currentTrack =>
      currentTrack.has(componentOrComponentId)
    )
  }

  getComponent<T extends Component = Component>(componentId: string) {
    return this.components().find(currentComponent =>
      currentComponent.isEquals(componentId)
    ) as Nullable<T>
  }
}

export default Level
