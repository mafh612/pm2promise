import * as pm2 from 'pm2'
import { disconnect } from '../../src/lib/disconnect'

beforeEach(() => {
  pm2.connect((err: Error) => {
    if (err) console.error(err) // tslint:disable-line no-console
  })
})
afterEach(() => {
  try {
    pm2.disconnect()
  } catch {
    //
  }
})

describe('test pm2promise disconnect', () => {
  test('describe instance', async () => {
    return expect(disconnect).toBeInstanceOf(Function)
  })

  test('disconnect call', async () => {
    spyOn(pm2, 'disconnect').and.returnValue(undefined)

    return expect(disconnect()).resolves.toEqual(undefined)
  })

  test('disconnect throw', async () => {
    spyOn(pm2, 'disconnect').and.throwError('fake error')

    return expect(disconnect()).rejects.toThrow('fake error')
  })
})
