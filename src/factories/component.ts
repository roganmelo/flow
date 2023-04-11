import CapsuleComponent from '../capsule-component'
import ChoiceComponent from '../choice-component'
import CommonComponent from '../common-component'
import Flow from '../flow'
import {
  isCapsuleSpec,
  isChoiceSpec,
  isLevelComponentSpec,
  isParallelSpec
} from '../guards'
import LevelComponent from '../level-component'
import ParallelComponent from '../parallel-component'

import { ComponentSpec } from 'src/types/spec'

const componentFactory = (spec: ComponentSpec, flow: Flow) => {
  if (isChoiceSpec(spec)) return new ChoiceComponent(spec, flow)

  if (isParallelSpec(spec)) return new ParallelComponent(spec, flow)

  if (isLevelComponentSpec(spec)) return new LevelComponent(spec, flow)

  if (isCapsuleSpec(spec)) return new CapsuleComponent(spec, flow)

  return new CommonComponent(spec, flow)
}

export default componentFactory
