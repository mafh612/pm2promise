import * as pm2 from 'pm2'
import { sendSignalToProcessName } from '../../src/lib/send.signal.to.process.name'

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

describe('test pm2promise sendSignalToProcessName', () => {
  test('describe instance', async () => {
    return expect(sendSignalToProcessName).toBeInstanceOf(Function)
  })

  test('sendSignalToProcessName call', async () => {
    const fake_function: (sgnl: string|number, process: string|number, cb: (err: Error, result: string) => void) => void
      = (signal: string|number, process: string|number, cb: (err: Error, result: string) => void): void => {
        cb(undefined, 'result')
      }
    spyOn(pm2, 'sendSignalToProcessName').and.callFake(fake_function)

    return expect(sendSignalToProcessName(1, 'process')).resolves.toEqual('result')
  })

  test('sendSignalToProcessName throw', async () => {
    const fake_function: (sgnl: string|number, process: string|number, cb: (err: Error, result: string) => void) => void
      = (sgnl: string|number, process: string|number, cb: (err: Error, result: string) => void): void => {
        cb(new Error('fake error'), undefined)
      }

    spyOn(pm2, 'sendSignalToProcessName').and.callFake(fake_function)

    return expect(sendSignalToProcessName(1, 'process')).rejects.toThrow('fake error')
  })
})
