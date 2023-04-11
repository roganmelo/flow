import { ChoiceSpec, ComponentSpec } from 'src/types/spec'

const isChoiceSpec = (spec: ComponentSpec): spec is ChoiceSpec =>
  spec.type === 'choice'

export default isChoiceSpec
