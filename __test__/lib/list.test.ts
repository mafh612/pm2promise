import * as pm2 from 'pm2'
import { list } from '../../src/lib/list'

beforeEach(() => {
  pm2.connect((err: Error) => {
    if (err) console.error(err) // tslint:disable-line no-console
  })
})
afterEach(() => {
  pm2.disconnect()
})

describe('test pm2promise list', () => {
  test('list instance', async () => {
    return expect(list).toBeInstanceOf(Function)
  })

  test('list call', async () => {
    const pd: pm2.ProcessDescription[] = [ { monit: { cpu: 0.5, memory: 42 }, name: 'test', } ]
    const fake_function: (cb: (err?: Error) => void) => void
      = (cb: (err: Error, pd: pm2.ProcessDescription[]) => void): void => {
        cb(undefined, pd)
      }

    spyOn(pm2, 'list').and.callFake(fake_function)

    return expect(list()).resolves.toEqual(pd)
  })

  test('list throw', async () => {
    const fake_function: (cb: (err?: Error) => void) => void
      = (cb: (err: Error, pd: pm2.ProcessDescription[]) => void): void => {
        cb(new Error('fake error'), undefined)
      }

    spyOn(pm2, 'list').and.callFake(fake_function)

    return expect(list()).rejects.toThrow('fake error')
  })
})
