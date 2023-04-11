type Container = {
  cacheMap?: Map<string, unknown>
}

type Arg = string | { toString?: () => string }

const cache =
  (cacheKeyTemplate?: string) =>
  (_: unknown, propertyKey: string, descriptor: PropertyDescriptor) => {
    const method = descriptor.value
    const cachedMethod = function (this: Container, ...args: Arg[]) {
      if (!this.cacheMap) this.cacheMap = new Map<string, unknown>()

      const cacheKey = args.reduce<string>((acc, currentArg, index) => {
        if (typeof currentArg === 'string') {
          return acc.replace(`{${index}}`, currentArg)
        }

        if (currentArg?.toString) {
          return acc.replace(`{${index}}`, currentArg.toString())
        }

        return acc
      }, cacheKeyTemplate || propertyKey)

      if (this.cacheMap.has(cacheKey)) return this.cacheMap.get(cacheKey)

      const result = method.call(this, ...args)

      this.cacheMap.set(cacheKey, result)

      return result
    }

    return {
      ...descriptor,
      value: cachedMethod
    }
  }

export default cache
