import { reload as pm2reload } from 'pm2'

/**
 * @description
 * Opens a message bus.
 * @returns Promise<axon.SubEmitterSocket>
 * @throws Error
 */
const reload: (process: string|number) => Promise<void>
  = (process: string|number): Promise<void> => {
    return new Promise((resolve: () => void, reject: (reason: Error) => void): void => {
      pm2reload(process, (err: Error) => {
        err ? reject(err) : resolve()
      })
    })
}

export { reload }
