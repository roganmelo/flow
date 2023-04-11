import { describe, it, expect } from 'vitest'

import { omit } from '../../src'

describe('omit', () => {
  it('should return a new object with omitted properties', () => {
    const object = { a: 1, b: '2', c: [3], d: { e: 4 } }
    const result = omit(object, ['a', 'c'])

    expect(result).toEqual({ b: '2', d: { e: 4 } })
  })

  it('should not modify the original object', () => {
    const object = { a: 1, b: '2', c: [3], d: { e: 4 } }

    omit(object, ['a', 'c'])

    expect(object).toEqual({ a: 1, b: '2', c: [3], d: { e: 4 } })
  })
})
