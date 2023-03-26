import Flow from './flow'
import LevelComponent from './level-component'
import { FlowSpec, LevelTypes } from './spec'
import { Nullable } from './types'
import TrackName from './value-objects/track-name'

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

  isEquals(levelOrLevelName: string | TrackName | Level) {
    const rawTrackName =
      levelOrLevelName instanceof Level
        ? levelOrLevelName.name()
        : levelOrLevelName

    return this.name().isEquals(rawTrackName)
  }

  spec() {
    return this.levelSpec
  }

  name() {
    return this.levelName
  }

  type() {
    return this.levelType
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
}

export default Level
