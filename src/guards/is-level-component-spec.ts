import {
  ComponentSpec,
  LevelComponentSpec,
  LevelComponentTypes
} from 'src/types/spec'

const isLevelComponentSpec = (
  spec: ComponentSpec
): spec is LevelComponentSpec =>
  Object.values(LevelComponentTypes).includes(
    spec.name?.toLowerCase() as LevelComponentTypes
  )

export default isLevelComponentSpec
