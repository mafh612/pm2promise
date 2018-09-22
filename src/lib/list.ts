import { list as pm2list, ProcessDescription } from 'pm2'

/**
 * @description
 * Opens a message bus.
 * @returns Promise<axon.SubEmitterSocket>
 * @throws Error
 */
const list: () => Promise<ProcessDescription[]>
  = (): Promise<ProcessDescription[]> => {
    return new Promise((resolve: (pD: ProcessDescription[]) => void, reject: (reason: Error) => void): void => {
      pm2list((err: Error, pD: ProcessDescription[]) => {
        err ? reject(err) : resolve(pD)
      })
    })
}

export { list }
