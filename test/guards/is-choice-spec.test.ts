import { faker } from '@faker-js/faker'
import { describe, it, expect } from 'vitest'

import { isChoiceSpec } from '../../src'

describe('isChoiceSpec', () => {
  it('should return true for a choice spec', () => {
    const spec = { type: 'choice' }

    expect(isChoiceSpec(spec)).toBe(true)
  })

  it('should return false for a non-choice component spec', () => {
    const spec = { type: faker.word.noun() }

    expect(isChoiceSpec(spec)).toBe(false)
  })

  it('should return false for non-object input', () => {
    expect(isChoiceSpec(faker.word.noun())).toBe(false)
  })

  it('should return false for an object without a type field', () => {
    expect(isChoiceSpec({})).toBe(false)
  })
})
