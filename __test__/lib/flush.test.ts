import * as pm2 from 'pm2'
import { flush } from '../../src/lib/flush'

beforeEach(() => {
  pm2.connect((err: Error) => {
    if (err) console.error(err) // tslint:disable-line no-console
  })
})
afterEach(() => {
  pm2.disconnect()
})

describe('test pm2promise _delete', () => {
  test('_delete instance', async () => {
    return expect(flush).toBeInstanceOf(Function)
  })

  test('_delete call', async () => {
    const result: string = 'flush result'
    const fake_function: (process: string|number, cb: (err?: Error) => void) => void
      = (process: string|number, cb: (err: Error, result: string) => void): void => {
        cb(undefined, result)
      }
    spyOn(pm2, 'flush').and.callFake(fake_function)

    return expect(flush('process')).resolves.toEqual(result)
  })

  test('_delete throw', async () => {
    const fake_function: (process: string|number, cb: (err?: Error) => void) => void
      = (process: string|number, cb: (err: Error, result: string) => void): void => {
        cb(new Error('fake error'), undefined)
      }
    spyOn(pm2, 'flush').and.callFake(fake_function)

    return expect(flush('process')).rejects.toThrow('fake error')
  })
})
