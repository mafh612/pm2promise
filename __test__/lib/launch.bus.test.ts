import { SubEmitterSocket } from 'axon'
import * as pm2 from 'pm2'
import { launchBus } from '../../src/lib/launchBus'

beforeEach(() => {
  pm2.connect((err: Error) => {
    if (err) console.error(err) // tslint:disable-line no-console
  })
})
afterEach(() => {
  pm2.disconnect()
})

describe('test pm2promise launchBus', () => {
  test('launchBus instance', async () => {
    return expect(launchBus).toBeInstanceOf(Function)
  })

  test('launchBus call', async () => {
    const bus: SubEmitterSocket = new SubEmitterSocket()
    const fake_function: (cb: (err: Error, bus: SubEmitterSocket) => void) => void
      = (cb: (err: Error, bus: SubEmitterSocket) => void): void => {
        cb(undefined, bus)
      }

    spyOn(pm2, 'launchBus').and.callFake(fake_function)

    return expect(launchBus()).resolves.toEqual(bus)
  })

  test('launchBus throw', async () => {
    const fake_function: (cb: (err: Error, bus: SubEmitterSocket) => void) => void
      = (cb: (err: Error, bus: SubEmitterSocket) => void): void => {
        cb(new Error('fake error'), undefined)
      }

    spyOn(pm2, 'launchBus').and.callFake(fake_function)

    return expect(launchBus()).rejects.toThrow('fake error')
  })
})
