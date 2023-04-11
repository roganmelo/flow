import { describe, it, expect } from 'vitest'

import { uuid } from '../../src'

describe('uuid', () => {
  it('should return a string', () => {
    const result = uuid()

    expect(typeof result === 'string').toBe(true)
  })

  it('should return a unique UUID', () => {
    const firstResult = uuid()
    const secondResult = uuid()

    expect(firstResult).not.toEqual(secondResult)
  })
})
