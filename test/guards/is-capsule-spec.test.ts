import { faker } from '@faker-js/faker'
import { describe, it, expect } from 'vitest'

import { isCapsuleSpec } from '../../src'

describe('isCapsuleSpec', () => {
  it('should return true for a capsule spec', () => {
    const spec = { type: 'capsule' }

    expect(isCapsuleSpec(spec)).toBe(true)
  })

  it('should return false for a non-capsule component spec', () => {
    const spec = { type: faker.word.noun() }

    expect(isCapsuleSpec(spec)).toBe(false)
  })

  it('should return false for non-object input', () => {
    expect(isCapsuleSpec(faker.word.noun())).toBe(false)
  })

  it('should return false for an object without a type field', () => {
    expect(isCapsuleSpec({})).toBe(false)
  })
})
