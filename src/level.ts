import Component from './component'
import Flow from './flow'
import LevelComponent from './level-component'
import { FlowSpec, LevelTypes } from './spec'
import Track from './track'
import TrackName from './track-name'
import { Mapper, Nullable, Predicate, Reducer } from './types'

class Level {
  private readonly levelName: TrackName

  constructor(
    private readonly levelSpec: FlowSpec,
    private readonly levelType: LevelTypes,
    private readonly parentComponent: Nullable<LevelComponent>,
    private readonly flow: Flow
  ) {
    if (levelType === LevelTypes.Start) {
      this.levelName = new TrackName(LevelTypes.Start)
    } else {
      if (!parentComponent) {
        throw new Error(
          'Parent component is required when level type is not start.'
        )
      }

      const parentComponentId = parentComponent.id()
      const levelName = `${parentComponentId}-${levelType}Track`

      this.levelName = new TrackName(levelName)
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
          new TrackName(currentTrackName),
          this.flow
        )
    )

    return tracks
  }

  mainTrack() {
    return this.getTrack(this.name()) as Track
  }

  hasTrack(trackOrTrackName: string | Track | TrackName) {
    const hasTrack = this.someTrack(currentTrack =>
      currentTrack.isEquals(trackOrTrackName)
    )

    return hasTrack
  }

  getTrack(trackName: string | TrackName) {
    const track = this.findTrack(currentTrack =>
      currentTrack.isEquals(trackName)
    )

    return track
  }

  mapTracks<T>(mapper: Mapper<Track, T>) {
    return this.tracks().map(mapper)
  }

  filterTracks(predicate: Predicate<Track>) {
    return this.tracks().filter(predicate)
  }

  findTrack(predicate: Predicate<Track>) {
    return this.tracks().find(predicate)
  }

  someTrack(predicate: Predicate<Track>) {
    return this.tracks().some(predicate)
  }

  everyTrack(predicate: Predicate<Track>) {
    return this.tracks().every(predicate)
  }

  reduceTracks<T>(reducer: Reducer<Track, T>, initial: T) {
    return this.tracks().reduce(reducer, initial)
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
    return this.findComponent<T>(currentComponent =>
      currentComponent.isEquals(componentId)
    )
  }

  mapComponents<T>(mapper: Mapper<Component, T>) {
    return this.components().map(mapper)
  }

  filterComponents<T extends Component = Component>(
    predicate: Predicate<Component>
  ) {
    return this.components().filter(predicate) as T[]
  }

  findComponent<T extends Component = Component>(
    predicate: Predicate<Component>
  ) {
    return this.components().find(predicate) as T
  }

  someComponent(predicate: Predicate<Component>) {
    return this.components().some(predicate)
  }

  everyComponent(predicate: Predicate<Component>) {
    return this.components().every(predicate)
  }

  reduceComponents<T>(reducer: Reducer<Component, T>, initial: T) {
    return this.components().reduce(reducer, initial)
  }
}

export default Level
