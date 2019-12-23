import * as pm2 from 'pm2'
import { restart } from '../../src/lib/restart'

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

describe('test pm2promise restart', () => {
  test('describe instance', async () => {
    expect(restart).toBeInstanceOf(Function)
  })

  test('restart call', async () => {
    const fake_function: (
      process: string | number,
      cb: (err?: Error) => void
    ) => void = (process: string | number, cb: (err: Error) => void): void => {
      cb(undefined)
    }
    spyOn(pm2, 'restart').and.callFake(fake_function)

    await expect(restart('process')).resolves.toEqual(undefined)
  })

  test('restart throw', async () => {
    const fake_function: (
      process: string | number,
      cb: (err?: Error) => void
    ) => void = (process: string | number, cb: (err: Error) => void): void => {
      cb(new Error('fake error'))
    }

    spyOn(pm2, 'restart').and.callFake(fake_function)

    await expect(restart('process')).rejects.toThrow('fake error')
  })
})
