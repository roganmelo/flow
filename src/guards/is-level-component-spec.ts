import {
  ComponentSpec,
  LevelComponentSpec,
  LevelComponentTypes
} from 'src/spec'

const isLevelComponentSpec = (
  spec: ComponentSpec
): spec is LevelComponentSpec =>
  Object.values(LevelComponentTypes).includes(
    spec.name?.toLowerCase() as LevelComponentTypes
  )

export default isLevelComponentSpec
