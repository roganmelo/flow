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
import TrackName from './track-name'
import { Nullable } from './types'

class Track {
  constructor(
    private readonly trackSpec: TrackSpec,
    private readonly trackName: TrackName,
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

  has(componentOrComponentId: string | Component): boolean {
    const id =
      typeof componentOrComponentId !== 'string'
        ? componentOrComponentId.id()
        : componentOrComponentId
    const hasComponent = this.components().some(
      currentComponent => currentComponent.id() === id
    )

    return hasComponent
  }

  getComponent(componentId: string) {
    const component = this.components().find(
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

  level() {
    const parent = this.parent()

    if (!parent) return this.flow.startLevel()

    const level = this.flow.levels().find(level => {
      const levelParent = level.parent()

      if (!levelParent) return false

      return parent.isEquals(levelParent) && this.type() === level.type()
    }) as Level

    return level
  }

  path() {
    const branch = this.flow
      .components()
      .reduce<Nullable<Condition | Execution | Level>>(
        (branch, currentComponent) => {
          if (branch) return branch

          const isParallelOrChoice =
            currentComponent instanceof ChoiceComponent ||
            currentComponent instanceof ParallelComponent

          if (isParallelOrChoice) {
            return currentComponent.branches().getByTrackName(this.name())
          }

          return undefined
        },
        undefined
      )

    const name = this.name().toString()

    if (branch) {
      const branchPath = branch.path() as string[]

      return [...branchPath, name]
    }

    const levelPath = this.level().path() as string[]

    return [...levelPath, name]
  }

  // Mutations

  // addComponents(components: Component[]) {
  //   const componentsSpecs = components.map(currentComponent =>
  //     currentComponent.spec()
  //   )

  //   return this.flow.update(this.path(), (trackSpec: TrackSpec) => [
  //     ...trackSpec,
  //     ...componentsSpecs
  //   ])
  // }

  // removeComponents(components: Component[]) {
  //   const componentsIds = components.map(currentComponent =>
  //     currentComponent.id()
  //   )
  //   const updater = (trackSpec: TrackSpec) =>
  //     trackSpec.filter(
  //       currentComponent => !componentsIds.includes(currentComponent.id)
  //     )

  //   return this.flow.update(this.path(), updater)
  // }

  // remove() {
  //   return this.flow.remove(this.path())
  // }

  // connect(to: Component | TrackName | Track) {
  //   if (to instanceof Component) {
  //     return this.addComponents([to]).remove(to.track().path())
  //   }

  //   if (to instanceof TrackName) {
  //     const track = this.flow.getTrack(to)

  //     if (!track) {
  //       throw new Error(`Track with track name ${to} does not exists.`)
  //     }

  //     return this.addComponents(track.components()).remove(track.path())
  //   }

  //   return this.addComponents(to.components()).remove(to.path())
  // }

  // disconnect(from: Component) {
  //   const componentIndex = from.index()
  //   const trackSpec = this.spec()
  //   const newTrackSpec = trackSpec.slice(0, componentIndex)
  //   const disconnectedTrackSpec = trackSpec.slice(componentIndex)
  //   const levelName = this.level().name().toString()
  //   const disconnectedTrackName = new TrackName({
  //     isDisconnected: true,
  //     levelName
  //   })

  //   return this.flow
  //     .update(this.path(), () => newTrackSpec)
  //     .update([disconnectedTrackName.toString()], () => disconnectedTrackSpec)
  // }
}

export default Track
