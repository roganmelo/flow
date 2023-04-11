import { faker } from '@faker-js/faker'
import { describe, it, expect } from 'vitest'

import { isChoiceSpec } from '../../src'

describe('isChoiceSpec', () => {
  it('should return true for a choice spec', () => {
    const spec = {
      id: faker.datatype.uuid(),
      type: 'choice',
      name: faker.word.noun(),
      stepName: faker.word.noun()
    }

    expect(isChoiceSpec(spec)).toBe(true)
  })

  it('should return false for a non-choice component spec', () => {
    const spec = {
      id: faker.datatype.uuid(),
      type: faker.word.noun(),
      name: faker.word.noun(),
      stepName: faker.word.noun()
    }

    expect(isChoiceSpec(spec)).toBe(false)
  })
})
