import { ComponentSpec, ChoiceSpec } from 'src/spec'

const isChoiceSpec = (spec: ComponentSpec): spec is ChoiceSpec =>
  spec.type === 'choice'

export default isChoiceSpec
