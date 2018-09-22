import * as pm2 from 'pm2'
import { killDaemon } from '../../src/lib/kill.daemon'

beforeEach(() => {
  pm2.connect((err: Error) => {
    if (err) console.error(err) // tslint:disable-line no-console
  })
})
afterEach(() => {
  pm2.disconnect()
})

describe('test pm2promise killDaemon', () => {
  test('killDaemon instance', async () => {
    return expect(killDaemon).toBeInstanceOf(Function)
  })

  test('killDaemon call', async () => {
    const fake_function: (cb: (err?: Error) => void) => void
      = (cb: (err?: Error) => void): void => {
        cb()
      }

    spyOn(pm2, 'killDaemon').and.callFake(fake_function)

    return expect(killDaemon()).resolves.toEqual(undefined)
  })

  test('killDaemon throw', async () => {
    const fake_function: (cb: (err?: Error) => void) => void
      = (cb: (err?: Error) => void): void => {
        cb(new Error('fake error'))
      }

    spyOn(pm2, 'killDaemon').and.callFake(fake_function)

    return expect(killDaemon()).rejects.toThrow('fake error')
  })
})
