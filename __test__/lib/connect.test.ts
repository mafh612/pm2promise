import * as pm2 from 'pm2'
import { connect } from '../../src/lib/connect'

afterEach(() => {
  pm2.disconnect()
})

describe('test pm2promise connect', () => {
  test('connect instance', async () => {
    expect(connect).toBeInstanceOf(Function)
  })

  test('connect call', async () => {
    await expect(connect()).resolves.toEqual(undefined)
  })

  test('connect throw', async () => {
    const fake_connect: (cb: (err: Error) => void) => void = (
      cb: (err: Error) => void
    ): void => {
      cb(new Error('fake error'))
    }

    spyOn(pm2, 'connect').and.callFake(fake_connect)

    await expect(connect()).rejects.toThrow('fake error')
  })

  test('connect call noDaemonMode', async () => {
    const fake_connect: (
      noDaemonMode: boolean,
      cb: (err: Error) => void
    ) => void = (noDaemonMode: boolean, cb: (err: Error) => void): void => {
      cb(undefined)
    }

    spyOn(pm2, 'connect').and.callFake(fake_connect)

    await expect(connect(false)).resolves.toEqual(undefined)
  })

  test('connect throw noDaemonMode', async () => {
    const fake_connect: (
      noDaemonMode: boolean,
      cb: (err: Error) => void
    ) => void = (noDaemonMode: boolean, cb: (err: Error) => void): void => {
      cb(new Error('fake error'))
    }

    spyOn(pm2, 'connect').and.callFake(fake_connect)

    await expect(connect(false)).rejects.toThrow('fake error')
  })
})
