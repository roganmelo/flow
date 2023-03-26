import Component from './component'
import Level from './level'
import LevelComponent from './level-component'
import { FlowSpec, LevelTypes } from './spec'
import Track from './track'
import { Mapper, Predicate, Reducer } from './types'
import TrackName from './value-objects/track-name'

class Flow {
  constructor(private readonly flowSpec: FlowSpec) {}

  spec() {
    return this.flowSpec
  }

  tracksNames() {
    return Object.keys(this.flowSpec)
  }

  levels() {
    const startLevel = this.startLevel()
    const levelComponents = this.filterComponents(
      currentComponent => currentComponent instanceof LevelComponent
    ) as LevelComponent[]
    const subLevels = levelComponents.reduce<Level[]>(
      (accSubLevels, currentLevelComponent) => {
        const onProcessLevel = currentLevelComponent.onProcessLevel()
        const onExceptionLevel = currentLevelComponent.onExceptionLevel()

        return [...accSubLevels, onProcessLevel, onExceptionLevel]
      },
      []
    )

    return [startLevel, ...subLevels]
  }

  tracks(): Track[] {
    const tracksNames = this.tracksNames()
    const tracks = tracksNames.map(
      currentTrackName =>
        new Track(
          this.flowSpec[currentTrackName],
          new TrackName(currentTrackName),
          this
        )
    )

    return tracks
  }

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

  // Levels

  startLevel() {
    const startLevelSpec = this.reduceTracks<FlowSpec>(
      (accTracks, currentTrack) => {
        if (currentTrack.isFromStart()) {
          return {
            ...accTracks,
            [currentTrack.name().toString()]: currentTrack.spec()
          }
        }

        return accTracks
      },
      {}
    )

    return new Level(startLevelSpec, LevelTypes.Start, undefined, this)
  }

  hasLevel(levelOrLevelName: string | Level | TrackName) {
    const hasLevel = this.someLevel(currentLevel => {
      if (levelOrLevelName instanceof Level) {
        return currentLevel.name().isEquals(levelOrLevelName.name())
      }

      return currentLevel.name().isEquals(levelOrLevelName)
    })

    return hasLevel
  }

  getLevel(levelName: string | TrackName) {
    const level = this.findLevel(currentLevel =>
      currentLevel.name().isEquals(levelName)
    )

    return level
  }

  mapLevels<T>(mapper: Mapper<Level, T>) {
    return this.levels().map(mapper)
  }

  filterLevels(predicate: Predicate<Level>) {
    return this.levels().filter(predicate)
  }

  findLevel(predicate: Predicate<Level>) {
    return this.levels().find(predicate)
  }

  someLevel(predicate: Predicate<Level>) {
    return this.levels().some(predicate)
  }

  everyLevel(predicate: Predicate<Level>) {
    return this.levels().every(predicate)
  }

  reduceLevels<T>(reducer: Reducer<Level, T>, initial: T) {
    return this.levels().reduce(reducer, initial)
  }

  // Tracks

  hasTrack(trackOrTrackName: string | Track | TrackName) {
    const hasTrack = this.someTrack(currentTrack => {
      if (trackOrTrackName instanceof Track) {
        return currentTrack.name().isEquals(trackOrTrackName.name())
      }

      return currentTrack.name().isEquals(trackOrTrackName)
    })

    return hasTrack
  }

  getTrack(trackName: string | TrackName) {
    const track = this.findTrack(currentTrack =>
      currentTrack.name().isEquals(trackName)
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

  hasComponent(componentOrComponentId: string | Component) {
    return this.tracks().some(currentTrack =>
      currentTrack.has(componentOrComponentId)
    )
  }

  getComponent<T extends Component = Component>(componentId: string) {
    return this.findComponent<T>(
      currentComponent => currentComponent.id() === componentId
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

export default Flow
