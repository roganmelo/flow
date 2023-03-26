import ChoiceComponent from '../choice-component'
import CommonComponent from '../common-component'
import Flow from '../flow'
import isChoiceSpec from '../guards/is-choice-spec'
import isLevelComponentSpec from '../guards/is-level-component-spec'
import isParallelSpec from '../guards/is-parallel-spec'
import LevelComponent from '../level-component'
import ParallelComponent from '../parallel-component'
import { ComponentSpec } from '../spec'

const componentFactory = (spec: ComponentSpec, flow: Flow) => {
  if (isChoiceSpec(spec)) return new ChoiceComponent(spec, flow)

  if (isParallelSpec(spec)) return new ParallelComponent(spec, flow)

  if (isLevelComponentSpec(spec)) return new LevelComponent(spec, flow)

  // if (componentSpec.type === 'capsule') {
  //   return ['capsule', componentSpec.name.replace(/\./, '')]
  // }

  return new CommonComponent(spec, flow)
}

export default componentFactory
