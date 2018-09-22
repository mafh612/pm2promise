import * as pm2 from 'pm2'
import { connect } from '../../src/lib/connect'

afterEach(() => {
  pm2.disconnect()
})

describe('test pm2promise connect', () => {
  test('connect instance', async () => {
    return expect(connect).toBeInstanceOf(Function)
  })

  test('connect call', async () => {
    return expect(connect()).resolves.toEqual(undefined)
  })

  test('connect call noDaemonMode', async () => {
    return expect(connect(false)).resolves.toEqual(undefined)
  })

  test('connect throw', async () => {
    const fake_connect: (cb: (err: Error) => void) => void
      = (cb: (err: Error) => void): void => { cb(new Error('fake error')) }

    spyOn(pm2, 'connect').and.callFake(fake_connect)

    return expect(connect()).rejects.toThrow('fake error')
  })
})
