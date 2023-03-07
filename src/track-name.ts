import { randomUUID } from 'crypto'

class TrackName {
  static startRegex = /^start$/
  static disconnectedRegex = /^disconnected-/
  static onProcessRegex = /-onProcessTrack$/
  static onExceptionRegex = /-onExceptionTrack$/

  private readonly id: string

  constructor(id?: string) {
    if (!id) this.id = `disconnected-${randomUUID()}`
    else this.id = id
  }

  toString() {
    return this.id
  }

  isStart() {
    return TrackName.startRegex.test(this.id)
  }

  isDisconnected() {
    return TrackName.disconnectedRegex.test(this.id)
  }

  isOnProcess() {
    return TrackName.onProcessRegex.test(this.id)
  }

  isOnException() {
    return TrackName.onExceptionRegex.test(this.id)
  }

  isSublevel() {
    const isOnProcess = TrackName.onProcessRegex.test(this.id)
    const isOnException = TrackName.onExceptionRegex.test(this.id)

    return isOnProcess || isOnException
  }
}

export default TrackName
