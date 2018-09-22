import { flush as pm2flush } from 'pm2'

/**
 * @description
 *  Flushes the logs.
 * @param process string|number
 * @returns Promise<string>
 * @throws Error
 */
const flush: (process: string|number) => Promise<string>
  = (process: string|number): Promise<string> => {
    return new Promise((resolve: (result: string) => void, reject: (reason: Error) => void): void => {
      pm2flush(process, (err: Error, result: string) => {
        err ? reject(err) : resolve(result)
      })
    })
}

export { flush }
