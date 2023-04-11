import { faker } from '@faker-js/faker'
import { describe, it, expect } from 'vitest'

import { isLevelComponentSpec, LevelComponentTypes } from '../../src'

describe('isLevelComponentSpec', () => {
  const levelComponentTypes = Object.values(LevelComponentTypes)

  it('should return true for a level component spec', () => {
    levelComponentTypes.forEach(levelComponentType => {
      const spec = { name: levelComponentType }

      expect(isLevelComponentSpec(spec)).toBe(true)
    })
  })

  it('should return false for a non-level component spec', () => {
    const spec = { name: faker.word.noun() }

    expect(isLevelComponentSpec(spec)).toBe(false)
  })

  it('should return false for non-object input', () => {
    expect(isLevelComponentSpec(faker.word.noun())).toBe(false)
  })

  it('should return false for an object without a name field', () => {
    expect(isLevelComponentSpec({})).toBe(false)
  })
})
