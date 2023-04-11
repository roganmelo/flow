import { ComponentSpec } from './component-spec'
import { LevelComponentTypes } from './level-component-types'

export type LevelComponentSpec = ComponentSpec & {
  name: LevelComponentTypes
  type: 'connector'
  params: {
    onProcess: string
    onException: string
    [key: string]: unknown
  }
}
