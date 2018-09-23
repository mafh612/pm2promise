// tslint:disable unified-signatures
import { start as pm2start, StartOptions } from 'pm2'

/**
 * @description
 * Starts a script that will be managed by pm2.
 * @param options StartOptions
 * @param jsonConfigFile string
 * @param script string
 * @returns Promise<void>
 * @throws Error
 */
function start(options: StartOptions): Promise<void>
function start(jsonConfigFile: string): Promise<void>
function start(script: string): Promise<void>
function start(script: string, options: StartOptions): Promise<void>
function start(script: string, jsonConfigFile: string): Promise<void>
function start(...args: any[]): Promise<void> {
    return new Promise((resolve: () => void, reject: (reason: Error) => void): void => {
      const [first, second]: string[]|StartOptions[] = args

      if (second && typeof second === 'object') {
        pm2start(first as string, second as StartOptions, (err: Error) => err ? reject(err) : resolve())

        return
      }

      if (second && typeof second === 'string') {
        pm2start(first as string, second as string, (err: Error) => err ? reject(err) : resolve())

        return
      }

      if (typeof first === 'object') {
        pm2start(first as StartOptions, (err: Error) => err ? reject(err) : resolve())

        return
      }

      if (typeof first === 'string') {
        pm2start(first as string, (err: Error) => err ? reject(err) : resolve())

        return
      }

      reject(new Error('options missing'))
    })
}

export { start }
