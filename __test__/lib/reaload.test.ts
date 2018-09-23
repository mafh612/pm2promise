import * as pm2 from 'pm2'
import { reload } from '../../src/lib/reload'

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

describe('test pm2promise reload', () => {
  test('describe instance', async () => {
    return expect(reload).toBeInstanceOf(Function)
  })

  test('reload call', async () => {
    const fake_function: (process: string|number, cb: (err?: Error) => void) => void
      = (process: string|number, cb: (err: Error) => void): void => {
        cb(undefined)
      }
    spyOn(pm2, 'reload').and.callFake(fake_function)

    return expect(reload('process')).resolves.toEqual(undefined)
  })

  test('reload throw', async () => {
    const fake_function: (process: string|number, cb: (err?: Error) => void) => void
      = (process: string|number, cb: (err: Error) => void): void => {
        cb(new Error('fake error'))
      }

    spyOn(pm2, 'reload').and.callFake(fake_function)

    return expect(reload('process')).rejects.toThrow('fake error')
  })
})
