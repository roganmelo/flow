import {
  ComponentSpec,
  LevelComponentSpec,
  LevelComponentTypes
} from 'src/spec'

const isLevelComponentSpec = (
  spec: ComponentSpec
): spec is LevelComponentSpec => spec.name?.toLowerCase() in LevelComponentTypes

export default isLevelComponentSpec
