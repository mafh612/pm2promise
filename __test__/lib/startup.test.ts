import * as pm2 from 'pm2'
import { startup } from '../../src/lib/startup'

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

describe('test pm2promise startup', () => {
  test('describe instance', async () => {
    expect(startup).toBeInstanceOf(Function)
  })

  test('startup call', async () => {
    const fake_function: (
      process: string | number,
      cb: (err?: Error) => void
    ) => void = (
      process: string | number,
      cb: (err: Error, result: string) => void
    ): void => {
      cb(undefined, 'result')
    }
    spyOn(pm2, 'startup').and.callFake(fake_function)

    await expect(startup('ubuntu')).resolves.toEqual('result')
  })

  test('startup throw', async () => {
    const fake_function: (
      process: string | number,
      cb: (err?: Error) => void
    ) => void = (
      process: string | number,
      cb: (err: Error, result: string) => void
    ): void => {
      cb(new Error('fake error'), undefined)
    }

    spyOn(pm2, 'startup').and.callFake(fake_function)

    await expect(startup('ubuntu')).rejects.toThrow('fake error')
  })
})
