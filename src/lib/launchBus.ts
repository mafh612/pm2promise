import { SubEmitterSocket } from 'axon'
import { launchBus as pm2launchBus } from 'pm2'

/**
 * @description
 * Opens a message bus.
 * @returns Promise<axon.SubEmitterSocket>
 * @throws Error
 */
const launchBus: () => Promise<SubEmitterSocket>
  = (): Promise<SubEmitterSocket> => {
    return new Promise((resolve: (bus: SubEmitterSocket) => void, reject: (reason: Error) => void): void => {
      pm2launchBus((err: Error, bus: SubEmitterSocket) => {
        err ? reject(err) : resolve(bus)
      })
    })
}

export { launchBus }
