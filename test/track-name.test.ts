import { faker } from '@faker-js/faker'
import { describe, it, expect } from 'vitest'

import { TrackName } from '../src'

describe('TrackName', () => {
  describe('constructor', () => {
    it('should set the id to "disconnected-<uuid>" when called with no args', () => {
      const disconnectedRegex =
        /^disconnected-[a-f\d]{8}(-[a-f\d]{4}){3}-[a-f\d]{12}$/
      const disconnectedTrackName = new TrackName()

      expect(disconnectedTrackName.toString()).toMatch(disconnectedRegex)
    })

    it('should set the id to the given value when called with a string', () => {
      const rawTrackName = faker.hacker.phrase()
      const trackName = new TrackName(rawTrackName)

      expect(trackName.toString()).toBe(rawTrackName)
    })
  })

  describe('isStart', () => {
    it('should return true if the id starts with "start"', () => {
      const trackName = new TrackName('start')

      expect(trackName.isStart()).toBe(true)
    })

    it('should return false otherwise', () => {
      const trackName = new TrackName(faker.datatype.uuid())

      expect(trackName.isStart()).toBe(false)
    })
  })

  describe('isDisconnected', () => {
    it('should return true if the id starts with "disconnected-"', () => {
      const rawTrackName = `disconnected-${faker.datatype.uuid()}`
      const trackName = new TrackName(rawTrackName)

      expect(trackName.isDisconnected()).toBe(true)
    })

    it('should return false otherwise', () => {
      const trackName = new TrackName(faker.datatype.uuid())

      expect(trackName.isDisconnected()).toBe(false)
    })
  })

  describe('isOnProcess', () => {
    it('should return true if the id ends with "-onProcessTrack"', () => {
      const trackName = new TrackName(`${faker.datatype.uuid()}-onProcessTrack`)

      expect(trackName.isOnProcess()).toBe(true)
    })

    it('should return false otherwise', () => {
      const trackName = new TrackName(faker.datatype.uuid())

      expect(trackName.isOnProcess()).toBe(false)
    })
  })

  describe('isOnException', () => {
    it('should return true if the id ends with "-onExceptionTrack"', () => {
      const rawTrackName = `${faker.datatype.uuid()}-onExceptionTrack`
      const trackName = new TrackName(rawTrackName)

      expect(trackName.isOnException()).toBe(true)
    })

    it('should return false otherwise', () => {
      const trackName = new TrackName(faker.datatype.uuid())

      expect(trackName.isOnException()).toBe(false)
    })
  })

  describe('isSublevel', () => {
    it('should return true if the id ends with "-onProcessTrack"', () => {
      const trackName = new TrackName(`${faker.datatype.uuid()}-onProcessTrack`)

      expect(trackName.isSublevel()).toBe(true)
    })

    it('should return true if the id ends with "-onExceptionTrack"', () => {
      const rawTrackName = `${faker.datatype.uuid()}-onExceptionTrack`
      const trackName = new TrackName(rawTrackName)

      expect(trackName.isSublevel()).toBe(true)
    })

    it('should return false otherwise', () => {
      const trackName = new TrackName(faker.datatype.uuid())

      expect(trackName.isSublevel()).toBe(false)
    })
  })
})
