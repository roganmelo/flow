import Flow from './flow'
import { TrackSpec } from './spec'
import TrackName from './track-name'

class Track {
  constructor(
    private readonly trackSpec: TrackSpec,
    private readonly trackName: TrackName,
    private readonly flow: Flow
  ) {}

  spec() {
    return this.trackSpec
  }

  name() {
    return this.trackName
  }

  isStart() {
    return this.trackName.isStart()
  }

  isDisconnected() {
    return this.trackName.isDisconnected()
  }

  // type() {}

  // path() {
  //   return [this.name()]
  // }

  // at(index: number): Component | Nullish {
  //   const componentSpec = this.trackSpec[index]
  //   if (!componentSpec) {
  //     return undefined
  //   }
  //   return createComponent(this.trackSpec[index], this.flow)
  // }

  // first(): Component | Nullish {
  //   const component = this.at(0)

  //   return component
  // }

  // last(): Component {
  //   const component = this.at(this.spec().length - 1)
  //   if (!component) throw new Error('Component does not exist')
  //   return component
  // }

  // indexOf(component: Component): number {
  //   return this.trackSpec.findIndex(
  //     componentSpec => componentSpec.id === component.id()
  //   )
  // }

  // has(_component: string | Component): boolean {
  //   const component =
  //     typeof _component === 'string'
  //       ? this.flow.getComponent(_component)
  //       : _component
  //   if (!component) return false
  //   return this.indexOf(component) !== -1 ? true : false
  // }

  // components(predicate?: (component: Component) => boolean): Component[] {
  //   return this.trackSpec.reduce((components, currentComponentSpec) => {
  //     const component = createComponent(currentComponentSpec, this.flow)
  //     if (predicate)
  //       return predicate(component) ? components.concat(component) : components
  //     return components.concat(component)
  //   }, [] as Component[])
  // }

  // find(
  //   predicate: (currentComponent: Component) => boolean
  // ): Component | Nullish {
  //   const foundComponentSpec = this.spec().find(currentComponentSpec => {
  //     const currentComponent = createComponent(currentComponentSpec, this.flow)
  //     return predicate(currentComponent)
  //   })

  //   return foundComponentSpec
  //     ? createComponent(foundComponentSpec, this.flow)
  //     : undefined
  // }

  // parentTrack(): Track | Nullish {
  //   // if (this.isStart()) throw new Error('Start track has no parent track')

  //   if (this.isDisconnected()) {
  //     const parentTrackName = this.name()
  //       .split('disconnected-')[1]
  //       .split(':')[0]
  //       .replace('-root', '')

  //     const level = this.flow.getLevel(parentTrackName)
  //     return level
  //   }

  //   const track = this.flow.findTrack(currentTrack => {
  //     const foundParentComponent = currentTrack.find(currentComponent => {
  //       return currentComponent.childTracksNames().includes(this.name())
  //     })

  //     return foundParentComponent ? true : false
  //   })

  //   // if (!track) throw new Error('Parent Track does not exists')

  //   return track
  // }

  // parentLevel(track: Track = this): Level | Nullish {
  //   const parentTrack = track.parentTrack()

  //   if (!parentTrack) return undefined

  //   if (parentTrack instanceof Level) return parentTrack

  //   return this.parentLevel(parentTrack)
  // }

  // parentComponent(): Component | Nullish {
  //   if (this.isDisconnected()) {
  //     const regex = /^disconnected-(.+):/
  //     const level = regex.exec(this.name())?.[1]

  //     if (!level || level === 'start') return undefined

  //     const id = level?.replace(/-(onProcessTrack|onExceptionTrack)/, '')
  //     const component = this.flow.getComponent(id)

  //     return component
  //   }

  //   const component = this.flow.findComponent(currentComponent => {
  //     return currentComponent.childTracksNames().includes(this.name())
  //   })

  //   return component
  // }

  // comesFromStart(): boolean {
  //   const recur = (track: Track): boolean => {
  //     if (track.isStart()) return true
  //     if (track.isDisconnected()) return false

  //     const parentComponent = track.parentComponent()
  //     const isFromBranchingComponent =
  //       parentComponent instanceof ChoiceComponent ||
  //       parentComponent instanceof ParallelComponent

  //     if (isFromBranchingComponent) {
  //       const branchingComponentTrack = parentComponent.parentTrack()

  //       return recur(branchingComponentTrack)
  //     }

  //     const level = track.parentLevel()

  //     if (level) return recur(level)

  //     return false
  //   }

  //   return recur(this)
  // }

  // branchingTracks(): Track[] {
  //   const isBranchingComponent = (component: Component) =>
  //     component instanceof ChoiceComponent ||
  //     component instanceof ParallelComponent

  //   const branchingComponent = this.find(isBranchingComponent)

  //   if (branchingComponent) {
  //     const trackNamesFromBranchingComponent =
  //       branchingComponent.childTracksNamesRecursively(isBranchingComponent)

  //     const tracksFromBranchingComponent = trackNamesFromBranchingComponent.map(
  //       currentTrackName => {
  //         return this.flow.getTrack(currentTrackName)
  //       }
  //     )

  //     return tracksFromBranchingComponent
  //   }

  //   return []
  // }

  // partialFlow(
  //   trackName: string = this.name(),
  //   withDisconnected = false,
  //   asDisconnected = false
  // ): FlowSpec {
  //   const track = this.spec()

  //   const _trackName = asDisconnected
  //     ? `disconnected-root:${uuid()}`
  //     : trackName

  //   const flowSpec: FlowSpec = {
  //     [_trackName]: track
  //   }

  //   const partialFlow = track.reduce((acc, currentComponentSpec) => {
  //     const component = createComponent(currentComponentSpec, this.flow)

  //     return {
  //       ...acc,
  //       ...component.partialFlow(withDisconnected)
  //     }
  //   }, flowSpec)

  //   if (withDisconnected && this instanceof Level) {
  //     const disconnected = this.disconnectedTracks().reduce(
  //       (acc, disconnectedTrack) => {
  //         return {
  //           ...acc,
  //           ...disconnectedTrack.partialFlow(
  //             asDisconnected
  //               ? `disconnected-root:${uuid()}`
  //               : `disconnected-${trackName}:${uuid()}`,
  //             withDisconnected
  //           )
  //         }
  //       },
  //       {}
  //     )

  //     return track.length > 0
  //       ? { ...partialFlow, ...disconnected }
  //       : disconnected
  //   }

  //   if (track.length === 0) return {}

  //   return partialFlow
  // }

  // toFlowSpec() {
  //   return this.partialFlow('start')
  // }

  // toCanvasSpec(): CanvasSpec {
  //   const mainTrackCanvasSpec = this.components().reduce(
  //     (canvasSpec, currentComponent) => {
  //       const node = currentComponent.toCanvasSpec()
  //       const previousComponent = currentComponent.prev()

  //       if (!previousComponent || previousComponent instanceof LevelComponent) {
  //         return [...canvasSpec, node]
  //       }

  //       const edge = {
  //         data: {
  //           source: previousComponent.id(),
  //           target: currentComponent.id(),
  //           id: uuid()
  //         }
  //       }

  //       return [...canvasSpec, node, edge]
  //     },
  //     [] as CanvasSpec
  //   )

  //   const branchingTracksCanvasSpec = this.branchingTracks().reduce(
  //     (canvasSpec, currentTrack) => {
  //       return canvasSpec.concat(currentTrack.toCanvasSpec())
  //     },
  //     [] as CanvasSpec
  //   )

  //   return [...mainTrackCanvasSpec, ...branchingTracksCanvasSpec]
  // }

  // tap(func: (flow: Track) => void): Track {
  //   func(this)
  //   return this
  // }
}

export { TrackName }
export default Track
