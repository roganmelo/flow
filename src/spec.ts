export type ComponentSpec = {
  id: string
  type: string
  name: string
  stepName: string
}

export type TrackSpec = ComponentSpec[]

export type FlowSpec = {
  [key: string]: TrackSpec
}
