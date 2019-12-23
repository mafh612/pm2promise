import * as pm2 from 'pm2'
import { sendDataToProcessId } from '../../src/lib/send.data.to.process.id'

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

describe('test pm2promise sendDataToProcessId', () => {
  test('describe instance', async () => {
    expect(sendDataToProcessId).toBeInstanceOf(Function)
  })

  test('sendDataToProcessId call', async () => {
    const fake_function: (
      proc: number,
      packet: object,
      cb: (err: Error, result: string) => void
    ) => void = (
      proc: number,
      packet: object,
      cb: (err: Error, result: string) => void
    ): void => {
      cb(undefined, 'result')
    }
    spyOn(pm2, 'sendDataToProcessId').and.callFake(fake_function)

    await expect(sendDataToProcessId(1, { data: 'test' })).resolves.toEqual(
      'result'
    )
  })

  test('sendDataToProcessId throw', async () => {
    const fake_function: (
      proc: number,
      packet: object,
      cb: (err: Error, result: string) => void
    ) => void = (
      proc: number,
      packet: object,
      cb: (err: Error, result: string) => void
    ): void => {
      cb(new Error('fake error'), undefined)
    }

    spyOn(pm2, 'sendDataToProcessId').and.callFake(fake_function)

    await expect(sendDataToProcessId(1, { data: 'test' })).rejects.toThrow(
      'fake error'
    )
  })
})
