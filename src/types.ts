export type Nullable<T> = T | undefined

// type Getters<T> = {
//   [P in keyof T as `get${Capitalize<string & P>}`]: () => T[P]
// }

// type Setters<T> = {
//   [P in keyof T as `set${Capitalize<string & P>}`]: (value: T[P]) => void
// }

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

// export type Optional<T, K extends keyof T> = T & {
//   [P in K]?: T[P] | undefined
// }

export type Mapper<T, R> = (current: T, index: number, array: T[]) => R

export type Predicate<T> = (current: T, index: number, array: T[]) => boolean

export type Reducer<T, R> = (
  accumulator: R,
  current: T,
  index: number,
  array: T[]
) => R
