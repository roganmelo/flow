import { faker } from '@faker-js/faker'
import { describe, it, expect } from 'vitest'

import { isParallelSpec } from '../../src'

describe('isParallelSpec', () => {
  it('should return true if the spec is a parallel execution connector', () => {
    const spec = {
      name: 'parallel-execution-connector',
      type: 'connector'
    }

    expect(isParallelSpec(spec)).toBe(true)
  })

  it('should return false if the spec is not a parallel execution connector', () => {
    const spec = {
      name: faker.word.noun(),
      type: faker.word.noun()
    }

    expect(isParallelSpec(spec)).toBe(false)
  })

  it('should return false for non-object input', () => {
    expect(isParallelSpec(faker.word.noun())).toBe(false)
  })

  it('should return false for an object without a type field', () => {
    const spec = { name: 'parallel-execution-connector' }

    expect(isParallelSpec(spec)).toBe(false)
  })

  it('should return false for an object without a name field', () => {
    const spec = { type: 'connector' }

    expect(isParallelSpec(spec)).toBe(false)
  })
})
