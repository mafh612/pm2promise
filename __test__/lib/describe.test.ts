import * as pm2 from 'pm2'
import { describe as _describe } from '../../src/lib/describe'

beforeEach(() => {
  pm2.connect((err: Error) => {
    if (err) console.error(err) // tslint:disable-line no-console
  })
})
afterEach(() => {
  pm2.disconnect()
})

describe('test pm2promise describe', () => {
  test('describe instance', async () => {
    return expect(_describe).toBeInstanceOf(Function)
  })

  test('describe call', async () => {
    const pd: pm2.ProcessDescription[] = [ { monit: { cpu: 0.5, memory: 42 }, name: 'test', } ]
    const fake_function: (process: string|number, cb: (err?: Error) => void) => void
      = (process: string|number, cb: (err: Error, pd: pm2.ProcessDescription[]) => void): void => {
        cb(undefined, pd)
      }

    spyOn(pm2, 'describe').and.callFake(fake_function)

    return expect(_describe('process')).resolves.toEqual(pd)
  })

  test('describe throw', async () => {
    const fake_function: (process: string|number, cb: (err?: Error) => void) => void
      = (process: string|number, cb: (err: Error, pd: pm2.ProcessDescription[]) => void): void => {
        cb(new Error('fake error'), undefined)
      }

    spyOn(pm2, 'describe').and.callFake(fake_function)

    return expect(_describe('process')).rejects.toThrow('fake error')
  })
})
