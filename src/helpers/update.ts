import lodashUpdate from 'lodash.update'

export default <T extends object, S>(
  object: T,
  path: string[],
  updater: (value: S) => S
) => lodashUpdate(structuredClone(object), path, updater)
