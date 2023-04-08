import { faker } from '@faker-js/faker'
import { describe, it, expect } from 'vitest'

import { LevelTypes, TrackName } from '../src'
// import { LevelTypes } from '../src/spec'
// import TrackName from '../src/track-name'

describe('TrackName', () => {
  describe('constructor', () => {
    it('should use the provided id if one is provided', () => {
      const fakeId = faker.datatype.uuid()
      const trackName = new TrackName({ id: fakeId })

      expect(trackName.toString()).toEqual(fakeId)
    })

    it('should create a track name from start level', () => {
      const trackName = new TrackName()

      expect(trackName.toString()).toMatch(LevelTypes.Start)
    })

    it('should create a disconnected track name from start level', () => {
      const disconnectedStartRegex = /^disconnected-start:.+$/
      const trackName1 = new TrackName({
        isDisconnected: true,
        levelName: LevelTypes.Start
      })
      const trackName2 = new TrackName({ isDisconnected: true })

      expect(trackName1.toString()).toMatch(disconnectedStartRegex)
      expect(trackName2.toString()).toMatch(disconnectedStartRegex)
    })

    it('should create a track name from on process level', () => {
      const parentId = faker.datatype.uuid()
      const onProcessTrackNameRegex = new RegExp(
        `^${parentId}-${LevelTypes.OnProcess}$`
      )
      const trackName = new TrackName({
        levelName: `${parentId}-${LevelTypes.OnProcess}`
      })

      expect(trackName.toString()).toMatch(onProcessTrackNameRegex)
    })

    it('should create a disconnected track name from on process level', () => {
      const parentId = faker.datatype.uuid()
      const disconnectedOnProcessRegex = new RegExp(
        `^disconnected-${parentId}-${LevelTypes.OnProcess}:.+$`
      )
      const trackName = new TrackName({
        isDisconnected: true,
        levelName: `${parentId}-${LevelTypes.OnProcess}`
      })

      expect(trackName.toString()).toMatch(disconnectedOnProcessRegex)
    })

    it('should create a track name from on exception level', () => {
      const parentId = faker.datatype.uuid()
      const onExceptionTrackNameRegex = new RegExp(
        `^${parentId}-${LevelTypes.OnException}$`
      )
      const trackName = new TrackName({
        levelName: `${parentId}-${LevelTypes.OnException}`
      })

      expect(trackName.toString()).toMatch(onExceptionTrackNameRegex)
    })

    it('should create a disconnected track name from on exception level', () => {
      const parentId = faker.datatype.uuid()
      const disconnectedOnExceptionRegex = new RegExp(
        `^disconnected-${parentId}-${LevelTypes.OnException}:.+$`
      )
      const trackName = new TrackName({
        isDisconnected: true,
        levelName: `${parentId}-${LevelTypes.OnException}`
      })

      expect(trackName.toString()).toMatch(disconnectedOnExceptionRegex)
    })
  })

  describe('isEquals', () => {
    it('should identify if a string or track name is equal to my track name', () => {
      const id1 = faker.random.word()
      const id2 = faker.random.word()
      const trackName1 = new TrackName({ id: id1 })
      const trackName2 = new TrackName({ id: id1 })
      const trackName3 = new TrackName({ id: id2 })

      expect(trackName1.isEquals(id1)).toBe(true)
      expect(trackName1.isEquals(trackName2)).toBe(true)
      expect(trackName1.isEquals(id2)).toBe(false)
      expect(trackName1.isEquals(trackName3)).toBe(false)
    })
  })

  describe('isDisconnected', () => {
    it('should identify disconnected track correctly', () => {
      const disconnectedTrackName = new TrackName({ isDisconnected: true })
      const connectedTrackName = new TrackName({ id: faker.random.word() })

      expect(disconnectedTrackName.isDisconnected()).toBe(true)
      expect(connectedTrackName.isDisconnected()).toBe(false)
    })
  })

  describe('isStart', () => {
    it('should identify start track correctly', () => {
      const parentId = faker.datatype.uuid()
      const startTrackName = new TrackName()
      const disconnectedStartTrackName = new TrackName({ isDisconnected: true })
      const onProcessTrackName = new TrackName({
        levelName: `${parentId}-${LevelTypes.OnProcess}`
      })
      const disconnectedOnProcessTrackName = new TrackName({
        isDisconnected: true,
        levelName: `${parentId}-${LevelTypes.OnProcess}`
      })
      const onExceptionTrackName = new TrackName({
        levelName: `${parentId}-${LevelTypes.OnException}`
      })
      const disconnectedOnExceptionTrackName = new TrackName({
        isDisconnected: true,
        levelName: `${parentId}-${LevelTypes.OnException}`
      })

      expect(startTrackName.isStart()).toBe(true)
      expect(disconnectedStartTrackName.isStart()).toBe(false)
      expect(onProcessTrackName.isStart()).toBe(false)
      expect(disconnectedOnProcessTrackName.isStart()).toBe(false)
      expect(onExceptionTrackName.isStart()).toBe(false)
      expect(disconnectedOnExceptionTrackName.isStart()).toBe(false)
    })
  })

  describe('isDisconnectedFromStart', () => {
    it('should identify disconnected track from start correctly', () => {
      const disconnectedStartTrackName = new TrackName({
        isDisconnected: true,
        levelName: LevelTypes.Start
      })
      const anotherTrackName = new TrackName()

      expect(disconnectedStartTrackName.isDisconnectedFromStart()).toBe(true)
      expect(anotherTrackName.isDisconnectedFromStart()).toBe(false)
    })
  })

  describe('isFromStart', () => {
    it('should identify a track from start correctly', () => {
      const startTrackName = new TrackName()
      const disconnectedStartTrackName = new TrackName({
        isDisconnected: true,
        levelName: LevelTypes.Start
      })
      const anotherTrackName = new TrackName({
        levelName: LevelTypes.OnProcess
      })
      const anotherDisconnectedTrackName = new TrackName({
        isDisconnected: true,
        levelName: LevelTypes.OnProcess
      })

      expect(startTrackName.isFromStart()).toBe(true)
      expect(disconnectedStartTrackName.isFromStart()).toBe(true)
      expect(anotherTrackName.isFromStart()).toBe(false)
      expect(anotherDisconnectedTrackName.isFromStart()).toBe(false)
    })
  })

  describe('isOnProcess', () => {
    it('should identify on process track correctly', () => {
      const parentId = faker.datatype.uuid()
      const startTrackName = new TrackName()
      const disconnectedStartTrackName = new TrackName({ isDisconnected: true })
      const onProcessTrackName = new TrackName({
        levelName: `${parentId}-${LevelTypes.OnProcess}Track`
      })
      const disconnectedOnProcessTrackName = new TrackName({
        isDisconnected: true,
        levelName: `${parentId}-${LevelTypes.OnProcess}Track`
      })
      const onExceptionTrackName = new TrackName({
        levelName: `${parentId}-${LevelTypes.OnException}Track`
      })
      const disconnectedOnExceptionTrackName = new TrackName({
        isDisconnected: true,
        levelName: `${parentId}-${LevelTypes.OnException}Track`
      })

      expect(startTrackName.isOnProcess()).toBe(false)
      expect(disconnectedStartTrackName.isOnProcess()).toBe(false)
      expect(onProcessTrackName.isOnProcess()).toBe(true)
      expect(disconnectedOnProcessTrackName.isOnProcess()).toBe(false)
      expect(onExceptionTrackName.isOnProcess()).toBe(false)
      expect(disconnectedOnExceptionTrackName.isOnProcess()).toBe(false)
    })
  })

  describe('isDisconnectedFromOnProcess', () => {
    it('should identify on process disconnected track correctly', () => {
      const parentId = faker.datatype.uuid()
      const startTrackName = new TrackName()
      const disconnectedStartTrackName = new TrackName({ isDisconnected: true })
      const onProcessTrackName = new TrackName({
        levelName: `${parentId}-${LevelTypes.OnProcess}Track`
      })
      const disconnectedOnProcessTrackName = new TrackName({
        isDisconnected: true,
        levelName: `${parentId}-${LevelTypes.OnProcess}Track`
      })
      const onExceptionTrackName = new TrackName({
        levelName: `${parentId}-${LevelTypes.OnException}Track`
      })
      const disconnectedOnExceptionTrackName = new TrackName({
        isDisconnected: true,
        levelName: `${parentId}-${LevelTypes.OnException}Track`
      })

      expect(startTrackName.isDisconnectedFromOnProcess()).toBe(false)
      expect(disconnectedStartTrackName.isDisconnectedFromOnProcess()).toBe(
        false
      )
      expect(onProcessTrackName.isDisconnectedFromOnProcess()).toBe(false)
      expect(disconnectedOnProcessTrackName.isDisconnectedFromOnProcess()).toBe(
        true
      )
      expect(onExceptionTrackName.isDisconnectedFromOnProcess()).toBe(false)
      expect(
        disconnectedOnExceptionTrackName.isDisconnectedFromOnProcess()
      ).toBe(false)
    })
  })

  describe('isFromOnProcess', () => {
    it('should identify a track that is from on process correctly', () => {
      const parentId = faker.datatype.uuid()
      const startTrackName = new TrackName()
      const disconnectedStartTrackName = new TrackName({ isDisconnected: true })
      const onProcessTrackName = new TrackName({
        levelName: `${parentId}-${LevelTypes.OnProcess}Track`
      })
      const disconnectedOnProcessTrackName = new TrackName({
        isDisconnected: true,
        levelName: `${parentId}-${LevelTypes.OnProcess}Track`
      })
      const onExceptionTrackName = new TrackName({
        levelName: `${parentId}-${LevelTypes.OnException}Track`
      })
      const disconnectedOnExceptionTrackName = new TrackName({
        isDisconnected: true,
        levelName: `${parentId}-${LevelTypes.OnException}Track`
      })

      expect(startTrackName.isFromOnProcess()).toBe(false)
      expect(disconnectedStartTrackName.isFromOnProcess()).toBe(false)
      expect(onProcessTrackName.isFromOnProcess()).toBe(true)
      expect(disconnectedOnProcessTrackName.isFromOnProcess()).toBe(true)
      expect(onExceptionTrackName.isFromOnProcess()).toBe(false)
      expect(disconnectedOnExceptionTrackName.isFromOnProcess()).toBe(false)
    })
  })

  describe('isOnException', () => {
    it('should identify on exception track correctly', () => {
      const parentId = faker.datatype.uuid()
      const startTrackName = new TrackName()
      const disconnectedStartTrackName = new TrackName({ isDisconnected: true })
      const onProcessTrackName = new TrackName({
        levelName: `${parentId}-${LevelTypes.OnProcess}Track`
      })
      const disconnectedOnProcessTrackName = new TrackName({
        isDisconnected: true,
        levelName: `${parentId}-${LevelTypes.OnProcess}Track`
      })
      const onExceptionTrackName = new TrackName({
        levelName: `${parentId}-${LevelTypes.OnException}Track`
      })
      const disconnectedOnExceptionTrackName = new TrackName({
        isDisconnected: true,
        levelName: `${parentId}-${LevelTypes.OnException}Track`
      })

      expect(startTrackName.isOnException()).toBe(false)
      expect(disconnectedStartTrackName.isOnException()).toBe(false)
      expect(onProcessTrackName.isOnException()).toBe(false)
      expect(disconnectedOnProcessTrackName.isOnException()).toBe(false)
      expect(onExceptionTrackName.isOnException()).toBe(true)
      expect(disconnectedOnExceptionTrackName.isOnException()).toBe(false)
    })
  })

  describe('isDisconnectedFromOnException', () => {
    it('should identify on exception disconnected track correctly', () => {
      const parentId = faker.datatype.uuid()
      const startTrackName = new TrackName()
      const disconnectedStartTrackName = new TrackName({ isDisconnected: true })
      const onProcessTrackName = new TrackName({
        levelName: `${parentId}-${LevelTypes.OnProcess}Track`
      })
      const disconnectedOnProcessTrackName = new TrackName({
        isDisconnected: true,
        levelName: `${parentId}-${LevelTypes.OnProcess}Track`
      })
      const onExceptionTrackName = new TrackName({
        levelName: `${parentId}-${LevelTypes.OnException}Track`
      })
      const disconnectedOnExceptionTrackName = new TrackName({
        isDisconnected: true,
        levelName: `${parentId}-${LevelTypes.OnException}Track`
      })

      expect(startTrackName.isDisconnectedFromOnException()).toBe(false)
      expect(disconnectedStartTrackName.isDisconnectedFromOnException()).toBe(
        false
      )
      expect(onProcessTrackName.isDisconnectedFromOnException()).toBe(false)
      expect(
        disconnectedOnProcessTrackName.isDisconnectedFromOnException()
      ).toBe(false)
      expect(onExceptionTrackName.isDisconnectedFromOnException()).toBe(false)
      expect(
        disconnectedOnExceptionTrackName.isDisconnectedFromOnException()
      ).toBe(true)
    })
  })

  describe('isFromOnException', () => {
    it('should identify a track that is from on exception correctly', () => {
      const parentId = faker.datatype.uuid()
      const startTrackName = new TrackName()
      const disconnectedStartTrackName = new TrackName({ isDisconnected: true })
      const onProcessTrackName = new TrackName({
        levelName: `${parentId}-${LevelTypes.OnProcess}Track`
      })
      const disconnectedOnProcessTrackName = new TrackName({
        isDisconnected: true,
        levelName: `${parentId}-${LevelTypes.OnProcess}Track`
      })
      const onExceptionTrackName = new TrackName({
        levelName: `${parentId}-${LevelTypes.OnException}Track`
      })
      const disconnectedOnExceptionTrackName = new TrackName({
        isDisconnected: true,
        levelName: `${parentId}-${LevelTypes.OnException}Track`
      })

      expect(startTrackName.isFromOnException()).toBe(false)
      expect(disconnectedStartTrackName.isFromOnException()).toBe(false)
      expect(onProcessTrackName.isFromOnException()).toBe(false)
      expect(disconnectedOnProcessTrackName.isFromOnException()).toBe(false)
      expect(onExceptionTrackName.isFromOnException()).toBe(true)
      expect(disconnectedOnExceptionTrackName.isFromOnException()).toBe(true)
    })
  })

  describe('isSublevel', () => {
    it('should identify a sublevel track correctly', () => {
      const parentId = faker.datatype.uuid()
      const startTrackName = new TrackName()
      const disconnectedStartTrackName = new TrackName({ isDisconnected: true })
      const onProcessTrackName = new TrackName({
        levelName: `${parentId}-${LevelTypes.OnProcess}Track`
      })
      const disconnectedOnProcessTrackName = new TrackName({
        isDisconnected: true,
        levelName: `${parentId}-${LevelTypes.OnProcess}Track`
      })
      const onExceptionTrackName = new TrackName({
        levelName: `${parentId}-${LevelTypes.OnException}Track`
      })
      const disconnectedOnExceptionTrackName = new TrackName({
        isDisconnected: true,
        levelName: `${parentId}-${LevelTypes.OnException}Track`
      })

      expect(startTrackName.isSublevel()).toBe(false)
      expect(disconnectedStartTrackName.isSublevel()).toBe(false)
      expect(onProcessTrackName.isSublevel()).toBe(true)
      expect(disconnectedOnProcessTrackName.isSublevel()).toBe(true)
      expect(onExceptionTrackName.isSublevel()).toBe(true)
      expect(disconnectedOnExceptionTrackName.isSublevel()).toBe(true)
    })
  })

  describe('parentId', () => {
    it('should returns undefined when called on a start track', () => {
      const trackName = new TrackName()

      expect(trackName.parentId()).toBeUndefined()
    })

    it('should returns undefined when called on a disconnected track that is not connected to the start track', () => {
      const trackName = new TrackName({ isDisconnected: true })

      expect(trackName.parentId()).toBeUndefined()
    })

    it('should returns the correct parent ID when called on a multi-level track connected to the start track', () => {
      const parentId = faker.datatype.uuid()
      const onProcessTrackName = new TrackName({
        levelName: `${parentId}-${LevelTypes.OnProcess}Track`
      })
      const onExceptionDisconnectedTrackName = new TrackName({
        isDisconnected: true,
        levelName: `${parentId}-${LevelTypes.OnException}Track`
      })

      expect(onProcessTrackName.parentId()).toBe(parentId)
      expect(onExceptionDisconnectedTrackName.parentId()).toBe(parentId)
    })
  })

  describe('type', () => {
    it('should return the correct type', () => {
      const parentId = faker.datatype.uuid()
      const startTrackName = new TrackName()
      const onProcessTrackName = new TrackName({
        levelName: `${parentId}-${LevelTypes.OnProcess}Track`
      })
      const onExceptionDisconnectedTrackName = new TrackName({
        isDisconnected: true,
        levelName: `${parentId}-${LevelTypes.OnException}Track`
      })

      expect(startTrackName.type()).toEqual(LevelTypes.Start)
      expect(onProcessTrackName.type()).toEqual(LevelTypes.OnProcess)
      expect(onExceptionDisconnectedTrackName.type()).toEqual(
        LevelTypes.OnException
      )
    })
  })
})
