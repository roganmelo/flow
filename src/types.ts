export type Nullish<T = never> = T extends never
  ? null | undefined
  : T | null | undefined
