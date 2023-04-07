import uuid from 'src/helpers/uuid'
import { LevelTypes } from 'src/spec'

type Options = {
  id?: string
  isDisconnected?: boolean
  levelName?: string
}

class TrackName {
  static disconnectedRegex = /^disconnected-/
  static startTrackRegex = new RegExp(`^${LevelTypes.Start}$`)
  static disconnectedStartRegex = new RegExp(
    `${TrackName.disconnectedRegex.toString()}${LevelTypes.Start}`
  )

  static onProcessRegex = new RegExp(`-${LevelTypes.OnProcess}Track`)
  static onExceptionRegex = new RegExp(`-${LevelTypes.OnException}Track`)
  static onProcessTrackRegex = new RegExp(
    `${TrackName.onProcessRegex.toString()}$`
  )

  static onExceptionTrackRegex = new RegExp(
    `${TrackName.onExceptionRegex.toString()}$`
  )

  static sublevelRegex = new RegExp(
    `-(${LevelTypes.OnProcess}Track|${LevelTypes.OnException}Track)`
  )

  private readonly id: string

  constructor({ id, isDisconnected, levelName }: Options) {
    const disconnectedPrefix = isDisconnected ? 'disconnected' : ''
    const level = levelName || LevelTypes.Start

    this.id = id || `${disconnectedPrefix}-${level}:${uuid()}`
  }

  isEquals(trackName: string | TrackName) {
    const rawTrackName =
      typeof trackName !== 'string' ? trackName.toString() : trackName

    return this.toString() === rawTrackName
  }

  toString() {
    return this.id
  }

  isDisconnected() {
    return TrackName.disconnectedRegex.test(this.id)
  }

  isStart() {
    return TrackName.startTrackRegex.test(this.id)
  }

  isDisconnectedFromStart() {
    return TrackName.disconnectedStartRegex.test(this.id)
  }

  isFromStart() {
    return this.isStart() || this.isDisconnectedFromStart()
  }

  isOnProcess() {
    return TrackName.onProcessTrackRegex.test(this.id)
  }

  isDisconnectedFromOnProcess() {
    return this.isDisconnected() && TrackName.onProcessRegex.test(this.id)
  }

  isFromOnProcess() {
    return this.isOnProcess() || this.isDisconnectedFromOnProcess()
  }

  isOnException() {
    return TrackName.onExceptionTrackRegex.test(this.id)
  }

  isDisconnectedFromOnException() {
    return this.isDisconnected() && TrackName.onExceptionRegex.test(this.id)
  }

  isFromOnException() {
    return this.isOnException() || this.isDisconnectedFromOnException()
  }

  isSublevel() {
    return TrackName.sublevelRegex.test(this.id)
  }

  parentId() {
    if (this.isStart() || this.isDisconnectedFromStart()) return undefined

    const regex = new RegExp(`${TrackName.disconnectedRegex}(.+):`)
    const levelName = regex.exec(this.toString())?.[1]
    const id = levelName?.replace(TrackName.sublevelRegex, '')

    return id
  }

  type() {
    if (this.isStart()) return LevelTypes.Start

    return this.isOnProcess() ? LevelTypes.OnProcess : LevelTypes.OnException
  }
}

export default TrackName
