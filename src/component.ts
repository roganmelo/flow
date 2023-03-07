import { ComponentSpec } from './spec'

abstract class Component {
  constructor(
    private readonly componentSpec: ComponentSpec // private readonly flow: Flow
  ) {}

  id() {
    return this.componentSpec.id
  }

  spec(): ComponentSpec {
    return this.componentSpec
  }

  // index(): number {
  //   return this.parentTrack().indexOf(this)
  // }

  // next(): Component | Nullish {
  //   const track = this.parentTrack()
  //   const nextInCurrentTrack = track.at(this.index() + 1)

  //   return nextInCurrentTrack
  // }

  // prev(): Component | Nullish {
  //   const track = this.parentTrack()
  //   const prevInCurrentTrack = track.at(this.index() - 1)

  //   if (prevInCurrentTrack) return prevInCurrentTrack

  //   const parentComponent = track.parentComponent()

  //   if (parentComponent) return parentComponent

  //   return undefined
  // }

  // path() {
  //   return [this.parentTrack().name(), this.index()]
  // }

  // parentTrack(): Track {
  //   const cacheId = `${this.id()}-parentTrack`
  //   if (this.flow.cache.has(cacheId))
  //     return this.flow.cache.get(cacheId) as Track

  //   const track = this.flow.findTrack(currentTrack => {
  //     return currentTrack.has(this)
  //   })

  //   if (!track) {
  //     throw new Error('Parent Track does not exists')
  //   }

  //   this.flow.cache.set(cacheId, track)

  //   return track
  // }

  // parentLevel(): Level {
  //   const cacheId = `${this.id()}-parentLevel`
  //   if (this.flow.cache.has(cacheId))
  //     return this.flow.cache.get(cacheId) as Level

  //   const parentTrack = this.parentTrack()

  //   if (parentTrack instanceof Level) return parentTrack

  //   const level = parentTrack.parentLevel() as Level

  //   this.flow.cache.set(cacheId, level)

  //   return level
  // }

  // childTracksNames(): string[] {
  //   return []
  // }

  // tap(func: (flow: Component) => void): Component {
  //   func(this)
  //   return this
  // }

  // partialFlow(): FlowSpec {
  //   return {}
  // }

  // // toFlowSpec() {
  // //   const flow = {
  // //     start: this.parentTrack().spec().slice(this.index())
  // //   }

  // //   return flow.start.reduce((acc, componentData) => {
  // //     const component = new BaseComponent(componentData, this.flow)

  // //     return {
  // //       ...acc,
  // //       ...component.partialFlow()
  // //     }
  // //   }, flow)
  // // }

  // // toCanvasSpec() {
  // //   const classes = getComponentClasses(this.spec())
  // //   const node = {
  // //     data: {
  // //       id: this.id()
  // //     },
  // //     classes
  // //   }
  // //   return node
  // // }

  // update(updater: (component: ComponentSpec) => ComponentSpec): Flow {
  //   return this.flow.updateComponent(this.id(), updater)
  // }

  // remove(): Flow {
  //   return this.flow.removeComponent(this.id())
  // }

  // disconnect(): Flow {
  //   return this.flow.disconnectComponent(this.id())
  // }

  // connectWith(targetComponentId: string): Flow {
  //   const targetComponent = this.flow.getComponent(targetComponentId)
  //   if (!targetComponent) {
  //     throw new Error('targetComponent does not exists')
  //   }
  //   return this.flow.connectComponent(this.id(), targetComponent.id())
  // }

  // childTracksNamesRecursively(
  //   filterComponents?: (component: Component) => boolean
  // ): string[] {
  //   const childTracksNames = this.childTracksNames()
  //   const tracks = this.flow.tracks(track =>
  //     childTracksNames.includes(track.name())
  //   )
  //   return tracks.reduce((acc, currentTrack) => {
  //     const allChildTracksRecursively = currentTrack
  //       .components(filterComponents)
  //       .reduce(
  //         (acc, currentComponent) =>
  //           acc.concat(
  //             currentComponent.childTracksNamesRecursively(filterComponents)
  //           ),
  //         [] as string[]
  //       )
  //     return acc.concat(allChildTracksRecursively)
  //   }, childTracksNames)
  // }
}

export default Component
