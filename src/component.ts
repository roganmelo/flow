import Flow from './flow'
import uuid from './helpers/uuid'
import { ComponentSpec } from './spec'
import Track from './track'
import { Optional, Nullable } from './types'

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
    const track = this.flow.findTrack(currentTrack =>
      currentTrack.has(this)
    ) as Track

    return track
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
}

export default Component
