export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

// export type Optional<T, K extends keyof T> = T & {
//   [P in K]?: T[P] | undefined
// }
