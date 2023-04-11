import { faker } from '@faker-js/faker'
import { describe, it, expect } from 'vitest'

import { isCapsuleSpec } from '../../src'

describe('isCapsuleSpec', () => {
  it('should return true for a capsule spec', () => {
    const spec = {
      id: faker.datatype.uuid(),
      type: 'capsule',
      name: faker.word.noun(),
      stepName: faker.word.noun()
    }

    expect(isCapsuleSpec(spec)).toBe(true)
  })

  it('should return false for a non-capsule component spec', () => {
    const spec = {
      id: faker.datatype.uuid(),
      type: faker.word.noun(),
      name: faker.word.noun(),
      stepName: faker.word.noun()
    }

    expect(isCapsuleSpec(spec)).toBe(false)
  })
})
