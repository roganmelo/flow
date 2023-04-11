import ChoiceComponent from '../choice-component'
import Flow from '../flow'
import { uuid } from '../helpers'
import ParallelComponent from '../parallel-component'
import Track from '../track'

import { ComponentSpec } from 'src/types/spec'
import { Nullable, Optional } from 'src/types/utils'

abstract class Component<
  ComponentSpecType extends ComponentSpec = ComponentSpec
> {
  protected readonly componentSpec: ComponentSpecType

  constructor(
    componentSpec: Optional<ComponentSpecType, 'id'>,
    protected readonly flow: Flow
  ) {
    this.componentSpec = {
      ...(componentSpec as ComponentSpecType),
      id: componentSpec.id || uuid()
    }
  }

  abstract next(): Nullable<Component> | Component[]

  prev(): Nullable<Component> {
    const track = this.track()
    const prevComponent = track.at(this.index() - 1)

    if (prevComponent) return prevComponent

    const branchingComponent = this.flow.components().find(currentComponent => {
      const isParallelOrChoice =
        currentComponent instanceof ChoiceComponent ||
        currentComponent instanceof ParallelComponent

      if (isParallelOrChoice) {
        const hasBranch = !!currentComponent
          .branches()
          .getByTrackName(track.name())

        return hasBranch
      }

      return false
    })

    if (branchingComponent) return branchingComponent

    return this.parent()?.prev()
  }

  isEquals(componentOrComponentId: string | Component) {
    const rawComponentId =
      componentOrComponentId instanceof Component
        ? componentOrComponentId.id()
        : componentOrComponentId

    return this.id() === rawComponentId
  }

  spec() {
    return this.componentSpec
  }

  id() {
    return this.spec().id
  }

  track(): Track {
    const track = this.flow
      .tracks()
      .find(currentTrack => currentTrack.has(this)) as Track

    return track
  }

  level() {
    return this.track().level()
  }

  parent() {
    return this.track().parent()
  }

  index(): number {
    return this.track().indexOf(this)
  }

  path() {
    const trackPath = this.track().path()
    const index = this.index().toString()

    return [...trackPath, index]
  }

  // Mutations

  // abstract connect(to: Component | TrackName | Track): Flow

  // abstract disconnect(from?: Component | TrackName | Track): Flow

  // abstract remove(): Flow
}

export default Component
