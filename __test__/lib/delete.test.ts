import * as pm2 from 'pm2'
import { delete as _delete } from '../../src/lib/delete'

beforeEach(() => {
  pm2.connect((err: Error) => {
    if (err) console.error(err) // tslint:disable-line no-console
  })
})
afterEach(() => {
  pm2.disconnect()
})

describe('test pm2promise delete', () => {
  test('delete instance', async () => {
    return expect(_delete).toBeInstanceOf(Function)
  })

  test('delete call', async () => {
    const fake_function: (process: string|number, cb: (err?: Error) => void) => void
      = (process: string|number, cb: (err?: Error) => void): void => { cb() }

    spyOn(pm2, 'delete').and.callFake(fake_function)

    return expect(_delete('process')).resolves.toEqual(undefined)
  })

  test('delete throw', async () => {
    const fake_function: (process: string|number, cb: (err: Error) => void) => void
      = (process: string|number, cb: (err: Error) => void): void => { cb(new Error('fake error')) }

    spyOn(pm2, 'delete').and.callFake(fake_function)

    return expect(_delete('process')).rejects.toThrow('fake error')
  })
})
