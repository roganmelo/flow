import { faker } from '@faker-js/faker'
import { describe, it, expect } from 'vitest'

import { isParallelSpec } from '../../src'

describe('isParallelSpec', () => {
  it('should return true if the spec is a parallel execution connector', () => {
    const spec = {
      id: faker.datatype.uuid(),
      name: 'parallel-execution-connector',
      type: 'connector',
      stepName: faker.word.noun()
    }

    expect(isParallelSpec(spec)).toBe(true)
  })

  it('should return false if the spec is not a parallel execution connector', () => {
    const spec = {
      id: faker.datatype.uuid(),
      name: faker.word.noun(),
      type: faker.word.noun(),
      stepName: faker.word.noun()
    }

    expect(isParallelSpec(spec)).toBe(false)
  })
})
