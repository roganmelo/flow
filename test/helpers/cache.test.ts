import { describe, it, expect } from 'vitest'

import { cache } from '../../src'

describe('cache decorator', () => {
  it('should return cached value when called with same arguments', () => {
    class TestClass {
      @cache('{0}-{1}')
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      testMethod(_arg1: string, _arg2: string) {
        return Math.random()
      }
    }

    const instance = new TestClass()

    const originalResult = instance.testMethod('arg1', 'arg2')
    const cachedResult = instance.testMethod('arg1', 'arg2')

    expect(cachedResult).toBe(originalResult)
  })

  it('should return different results for different arguments', () => {
    class TestClass {
      @cache('{0}')
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      testMethod(_arg1: string) {
        return Math.random()
      }
    }

    const instance = new TestClass()

    const result1 = instance.testMethod('arg1')
    const result2 = instance.testMethod('arg2')

    expect(result1).not.toBe(result2)
  })

  it('should return cached value when called with same arguments, but with numbers', () => {
    class TestClass {
      @cache('{0}-{1}')
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      testMethod(_arg1: number, _arg2: number) {
        return Math.random()
      }
    }

    const instance = new TestClass()

    const originalResult = instance.testMethod(1, 2)
    const cachedResult = instance.testMethod(1, 2)

    expect(cachedResult).toBe(originalResult)
  })

  it('should not replace template if arg is null or undefined', () => {
    class TestClass {
      @cache('{0}-{1}')
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      testMethod(_arg1: unknown, _arg2: unknown) {
        return Math.random()
      }
    }

    const instance = new TestClass()

    const originalResult = instance.testMethod(null, undefined)
    const cachedResult = instance.testMethod(undefined, null)

    expect(cachedResult).toBe(originalResult)
  })

  it('should use method name on cache key if template was not provided', () => {
    class TestClass {
      @cache()
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      testMethod(_arg1: string) {
        return Math.random()
      }
    }

    const instance = new TestClass()

    const originalResult = instance.testMethod('arg1')
    const cachedResult = instance.testMethod('arg2')

    expect(cachedResult).toBe(originalResult)
  })
})
