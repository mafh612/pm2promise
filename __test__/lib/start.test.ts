import * as pm2 from 'pm2'
import { start } from '../../src/lib/start'

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

const startOptions: pm2.StartOptions = {
  name: 'test',
  script: 'test.js'
}

describe('test pm2promise start', () => {
  test('describe instance', async () => {
    expect(start).toBeInstanceOf(Function)
  })

  test('start call - no parameters', async () => {
    const fake_function: (
      options: pm2.StartOptions,
      cb: (err?: Error) => void
    ) => void = (options: pm2.StartOptions, cb: (err: Error) => void): void => {
      cb(undefined)
    }
    spyOn(pm2, 'start').and.callFake(fake_function)

    await expect(start(undefined)).rejects.toThrow('options missing')
  })

  test('start call - options', async () => {
    const fake_function: (
      options: pm2.StartOptions,
      cb: (err?: Error) => void
    ) => void = (options: pm2.StartOptions, cb: (err: Error) => void): void => {
      cb(undefined)
    }
    spyOn(pm2, 'start').and.callFake(fake_function)

    await expect(start(startOptions)).resolves.toEqual(undefined)
  })

  test('start throw - options', async () => {
    const fake_function: (
      options: pm2.StartOptions,
      cb: (err?: Error) => void
    ) => void = (options: pm2.StartOptions, cb: (err: Error) => void): void => {
      cb(new Error('fake error'))
    }

    spyOn(pm2, 'start').and.callFake(fake_function)

    await expect(start(startOptions)).rejects.toThrow('fake error')
  })

  test('start call - script', async () => {
    const fake_function: (script: string, cb: (err?: Error) => void) => void = (
      script: string,
      cb: (err: Error) => void
    ): void => {
      cb(undefined)
    }
    spyOn(pm2, 'start').and.callFake(fake_function)

    await expect(start('script.js')).resolves.toEqual(undefined)
  })

  test('start throw - script', async () => {
    const fake_function: (script: string, cb: (err?: Error) => void) => void = (
      script: string,
      cb: (err: Error) => void
    ): void => {
      cb(new Error('fake error'))
    }

    spyOn(pm2, 'start').and.callFake(fake_function)

    await expect(start('script.js')).rejects.toThrow('fake error')
  })

  test('start call - script and options', async () => {
    const fake_function: (
      script: string,
      options: pm2.StartOptions,
      cb: (err?: Error) => void
    ) => void = (
      script: string,
      options: pm2.StartOptions,
      cb: (err: Error) => void
    ): void => {
      cb(undefined)
    }
    spyOn(pm2, 'start').and.callFake(fake_function)

    await expect(start('script.js', startOptions)).resolves.toEqual(undefined)
  })

  test('start throw - script and options', async () => {
    const fake_function: (
      script: string,
      options: pm2.StartOptions,
      cb: (err?: Error) => void
    ) => void = (
      script: string,
      options: pm2.StartOptions,
      cb: (err: Error) => void
    ): void => {
      cb(new Error('fake error'))
    }

    spyOn(pm2, 'start').and.callFake(fake_function)

    await expect(start('script.js', startOptions)).rejects.toThrow('fake error')
  })

  test('start call - script and jsonConfigFile', async () => {
    const fake_function: (
      script: string,
      jsonConfigFile: string,
      cb: (err?: Error) => void
    ) => void = (
      script: string,
      jsonConfigFile: string,
      cb: (err: Error) => void
    ): void => {
      cb(undefined)
    }
    spyOn(pm2, 'start').and.callFake(fake_function)

    await expect(start('script.js', 'process.json')).resolves.toEqual(undefined)
  })

  test('start throw - script and jsonConfigFile', async () => {
    const fake_function: (
      script: string,
      jsonConfigFile: string,
      cb: (err?: Error) => void
    ) => void = (
      script: string,
      jsonConfigFile: string,
      cb: (err: Error) => void
    ): void => {
      cb(new Error('fake error'))
    }

    spyOn(pm2, 'start').and.callFake(fake_function)

    await expect(start('script.js', 'process.json')).rejects.toThrow(
      'fake error'
    )
  })
})
