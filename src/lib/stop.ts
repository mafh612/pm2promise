import { stop as pm2stop } from 'pm2'

/**
 * @description
 * Stops a process but leaves the process meta-data in pm2’s list.
 * @returns Promise<void>
 * @throws Error
 */
const stop: (process: string|number) => Promise<void>
  = (process: string|number): Promise<void> => {
    return new Promise((resolve: () => void, reject: (reason: Error) => void): void => {
      pm2stop(process, (err: Error) => {
        err ? reject(err) : resolve()
      })
    })
}

export { stop }
