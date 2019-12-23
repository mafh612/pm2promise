import * as pm2 from 'pm2'
import { stop } from '../../src/lib/stop'

beforeEach(() => {
  pm2.connect((err: Error) => {
    if (err) console.error(err) // tslint:disable-line no-console
  })
})
afterEach(() => {
  try {
    pm2.disconnect()
  } catch (e) {
    console.log('already closed') // tslint:disable-line no-console
  }
})

describe('test pm2promise stop', () => {
  test('describe instance', async () => {
    expect(stop).toBeInstanceOf(Function)
  })

  test('stop call', async () => {
    const fake_function: (
      process: string | number,
      cb: (err?: Error) => void
    ) => void = (process: string | number, cb: (err: Error) => void): void => {
      cb(undefined)
    }
    spyOn(pm2, 'stop').and.callFake(fake_function)

    await expect(stop('process')).resolves.toEqual(undefined)
  })

  test('stop throw', async () => {
    const fake_function: (
      process: string | number,
      cb: (err?: Error) => void
    ) => void = (process: string | number, cb: (err: Error) => void): void => {
      cb(new Error('fake error'))
    }

    spyOn(pm2, 'stop').and.callFake(fake_function)

    await expect(stop('process')).rejects.toThrow('fake error')
  })
})
