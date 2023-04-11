import { faker } from '@faker-js/faker'
import { describe, it, expect } from 'vitest'

import { isLevelComponentSpec, LevelComponentTypes } from '../../src'

describe('isLevelComponentSpec', () => {
  const levelComponentTypes = Object.values(LevelComponentTypes)

  it('should return true for a level component spec', () => {
    levelComponentTypes.forEach(levelComponentType => {
      const spec = {
        id: faker.datatype.uuid(),
        type: faker.word.noun(),
        name: levelComponentType,
        stepName: faker.word.noun()
      }

      expect(isLevelComponentSpec(spec)).toBe(true)
    })
  })

  it('should return false for a non-level component spec', () => {
    const spec = {
      id: faker.datatype.uuid(),
      type: faker.word.noun(),
      name: faker.word.noun(),
      stepName: faker.word.noun()
    }

    expect(isLevelComponentSpec(spec)).toBe(false)
  })
})
