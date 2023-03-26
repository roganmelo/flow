import { ComponentSpec, ChoiceSpec } from 'src/spec'

const isCapsuleSpec = (spec: ComponentSpec): spec is ChoiceSpec =>
  spec.type === 'capsule'

export default isCapsuleSpec
