import { CapsuleSpec, ComponentSpec } from 'src/types/spec'

const isCapsuleSpec = (spec: ComponentSpec): spec is CapsuleSpec =>
  spec.type === 'capsule'

export default isCapsuleSpec
