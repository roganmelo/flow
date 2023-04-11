import { ComponentSpec } from './component-spec'
import { WhenSpec } from './when-spec'

export type ChoiceSpec = ComponentSpec & {
  type: 'choice'
  when: WhenSpec[]
  otherwise?: string
}
