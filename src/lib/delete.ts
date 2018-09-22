import { delete as pm2delete } from 'pm2'

/**
 * @description
 * Stops the process and removes it from pm2’s list. The process will no longer be accessible by its name.
 * @param process string|number
 * @returns Promise<void>
 * @throws Error
 */
const _delete: (process: string|number) => Promise<void> = (process: string|number): Promise<void> => {
  return new Promise((resolve: () => void, reject: (reason: Error) => void): void => {
    pm2delete(process, (err: Error) => err ? reject(err) : resolve())
  })
}

export { _delete as delete }
