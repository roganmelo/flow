import ChoiceComponent from './choice-component'
import Component from './component'
import Condition from './condition'
import Execution from './execution'
import componentFactory from './factories/component'
import Flow from './flow'
import Level from './level'
import LevelComponent from './level-component'
import ParallelComponent from './parallel-component'
import { TrackSpec } from './spec'
import { Mapper, Nullable, Predicate, Reducer } from './types'
import TrackName from './value-objects/track-name'

class Track {
  constructor(
    private readonly trackSpec: TrackSpec,
    private readonly trackName: TrackName = new TrackName(),
    private readonly flow: Flow
  ) {}

  isEquals(trackOrTrackName: string | TrackName | Track) {
    const rawTrackName =
      trackOrTrackName instanceof Track
        ? trackOrTrackName.name()
        : trackOrTrackName

    return this.name().isEquals(rawTrackName)
  }

  spec() {
    return this.trackSpec
  }

  name() {
    return this.trackName
  }

  isDisconnected() {
    return this.name().isDisconnected()
  }

  isStart() {
    return this.name().isStart()
  }

  isDisconnectedFromStart() {
    return this.name().isDisconnectedFromStart()
  }

  isFromStart() {
    return this.name().isFromStart()
  }

  isOnProcess() {
    return this.name().isOnProcess()
  }

  isDisconnectedFromOnProcess() {
    return this.name().isDisconnectedFromOnProcess()
  }

  isFromOnProcess() {
    return this.name().isFromOnProcess()
  }

  isOnException() {
    return this.name().isOnException()
  }

  isDisconnectedFromOnException() {
    return this.name().isDisconnectedFromOnException()
  }

  isFromOnException() {
    return this.name().isFromOnException()
  }

  isSublevel() {
    return this.name().isSublevel()
  }

  isChildOf(componentOrComponentId: LevelComponent | string) {
    const componentId =
      componentOrComponentId instanceof LevelComponent
        ? componentOrComponentId.id()
        : componentOrComponentId

    return this.name().parentId() === componentId
  }

  components() {
    const components = this.trackSpec.map(componentSpec =>
      componentFactory(componentSpec, this.flow)
    )

    return components
  }

  map<T>(mapper: Mapper<Component, T>) {
    return this.components().map(mapper)
  }

  filter(predicate: Predicate<Component>) {
    return this.components().filter(predicate)
  }

  find(predicate: Predicate<Component>) {
    return this.components().find(predicate)
  }

  some(predicate: Predicate<Component>) {
    return this.components().some(predicate)
  }

  every(predicate: Predicate<Component>) {
    return this.components().every(predicate)
  }

  reduce<T>(reducer: Reducer<Component, T>, initial: T) {
    return this.components().reduce(reducer, initial)
  }

  has(componentOrComponentId: string | Component): boolean {
    const id =
      typeof componentOrComponentId !== 'string'
        ? componentOrComponentId.id()
        : componentOrComponentId
    const hasComponent = this.some(
      currentComponent => currentComponent.id() === id
    )

    return hasComponent
  }

  getComponent(componentId: string) {
    const component = this.find(
      currentComponent => currentComponent.id() === componentId
    )

    return component
  }

  at(index: number): Nullable<Component> {
    return this.components()[index]
  }

  first() {
    return this.at(0)
  }

  last() {
    return this.at(this.spec().length - 1)
  }

  indexOf(component: Component) {
    return this.components().findIndex(
      currentComponent => currentComponent.id() === component.id()
    )
  }

  parent(): Nullable<Component> {
    const id = this.name().parentId()

    if (!id) return undefined

    return this.flow.getComponent(id)
  }

  type() {
    return this.trackName.type()
  }

  path() {
    const branchOrLevel = this.flow.reduceComponents<
      Nullable<Condition | Execution | Level>
    >((branch, currentComponent) => {
      if (branch) return branch

      if (
        currentComponent instanceof ChoiceComponent ||
        currentComponent instanceof ParallelComponent
      ) {
        return currentComponent.branches().getByTrackName(this.name())
      }

      if (currentComponent instanceof LevelComponent) {
        const onProcessLevel = currentComponent.onProcessLevel()
        const onExceptionLevel = currentComponent.onExceptionLevel()

        if (this.isFromOnProcess() && onProcessLevel.isEquals(this.name())) {
          return onProcessLevel
        }

        if (
          this.isFromOnException() &&
          onExceptionLevel.isEquals(this.name())
        ) {
          return onExceptionLevel
        }
      }

      return undefined
    }, undefined)

    if (branchOrLevel) {
      const branchOrLevelPath = branchOrLevel.path() as string[]

      return [...branchOrLevelPath, this.name().toString()]
    }

    return [this.name().toString()]
  }
}

export default Track
