import { describe, it, expect } from 'vitest'

import { update } from '../../src'

describe('update', () => {
  it('should return a new object with updated property', () => {
    const object = { a: 1, b: '2', c: [3], d: { e: 4 } }
    const result = update<object, number>(
      object,
      ['d', 'e'],
      value => value + 1
    )

    expect(result).toEqual({ a: 1, b: '2', c: [3], d: { e: 5 } })
  })

  it('should not modify the original object', () => {
    const object = { a: 1, b: '2', c: [3], d: { e: 4 } }

    update<object, number>({ ...object }, ['d', 'e'], value => value + 1)

    expect(object).toEqual({ a: 1, b: '2', c: [3], d: { e: 4 } })
  })
})
