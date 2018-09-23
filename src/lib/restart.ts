import { restart as pm2restart } from 'pm2'

/**
 * @description
 * Stops and restarts the process.
 * @returns Promise<void>
 * @throws Error
 */
const restart: (process: string|number) => Promise<void>
  = (process: string|number): Promise<void> => {
    return new Promise((resolve: () => void, reject: (reason: Error) => void): void => {
      pm2restart(process, (err: Error) => {
        err ? reject(err) : resolve()
      })
    })
}

export { restart }
