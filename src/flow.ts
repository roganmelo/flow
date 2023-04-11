import Component from './abstractions/component'
// import { cache, omit, update } from './helpers'
import Level from './level'
import LevelComponent from './level-component'
import Track from './track'
import TrackName from './track-name'
import { FlowSpec, LevelTypes } from './types/spec'
import { Nullable } from './types/utils'

class Flow {
  constructor(private readonly flowSpec: FlowSpec) {}

  spec() {
    return this.flowSpec
  }

  tracksNames() {
    return Object.keys(this.spec())
  }

  levels() {
    const startLevel = this.startLevel()
    const levelComponents = this.components().filter(
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
          this.spec()[currentTrackName],
          new TrackName({ id: currentTrackName }),
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

  // @cache('start-level')
  startLevel() {
    const startLevelSpec = this.tracks().reduce<FlowSpec>(
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
    const hasLevel = this.levels().some(currentLevel =>
      currentLevel.isEquals(levelOrLevelName)
    )

    return hasLevel
  }

  // @cache('{0}-get-level')
  getLevel(levelName: string | TrackName) {
    const level = this.levels().find(currentLevel =>
      currentLevel.isEquals(levelName)
    )

    return level
  }

  // Tracks

  hasTrack(trackOrTrackName: string | Track | TrackName) {
    const hasTrack = this.tracks().some(currentTrack =>
      currentTrack.isEquals(trackOrTrackName)
    )

    return hasTrack
  }

  // @cache('{0}-get-track')
  getTrack(trackName: string | TrackName) {
    const track = this.tracks().find(currentTrack =>
      currentTrack.isEquals(trackName)
    )

    return track
  }

  // Components

  hasComponent(componentOrComponentId: string | Component) {
    return this.tracks().some(currentTrack =>
      currentTrack.has(componentOrComponentId)
    )
  }

  // @cache('{0}-get-component')
  getComponent<T extends Component = Component>(componentId: string) {
    return this.components().find(currentComponent =>
      currentComponent.isEquals(componentId)
    ) as Nullable<T>
  }

  // Mutations

  // update<T>(path: string[], updater: (value: T) => T): Flow {
  //   const flowSpecClone = structuredClone(this.spec())
  //   const updatedFlowSpec = lodashUpdate(flowSpecClone, path, updater)

  //   return new Flow(updatedFlowSpec)
  // }

  // remove(path: string[]) {
  //   const flowSpecClone = structuredClone(this.spec())
  //   const updatedFlowSpec = lodashOmit(flowSpecClone, path)

  //   return new Flow(updatedFlowSpec)
  // }
}

export default Flow
