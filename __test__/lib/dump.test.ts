import * as pm2 from 'pm2'
import { dump } from '../../src/lib/dump'

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
    return expect(dump).toBeInstanceOf(Function)
  })

  test('_delete call', async () => {
    const result: string = 'dump result'
    const fake_function: (cb: (err?: Error) => void) => void
      = (cb: (err: Error, result: string) => void): void => {
        cb(undefined, result)
      }
    spyOn(pm2, 'dump').and.callFake(fake_function)

    return expect(dump()).resolves.toEqual(result)
  })

  test('_delete throw', async () => {
    const fake_function: (cb: (err?: Error) => void) => void
      = (cb: (err: Error, result: string) => void): void => {
        cb(new Error('fake error'), undefined)
      }
    spyOn(pm2, 'dump').and.callFake(fake_function)

    return expect(dump()).rejects.toThrow('fake error')
  })
})
