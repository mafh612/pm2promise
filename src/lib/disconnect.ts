import { disconnect as pm2disconnect } from 'pm2'

/**
 * @description
 * Disconnects from the pm2 daemon.
 * @returns Promise<void>
 * @throws Error
 */
const disconnect: () => Promise<void> = (): Promise<void> => {
    return new Promise((resolve: () => void, reject: (reason: Error) => void): void => {
      try {
        pm2disconnect()
        resolve()
      } catch (e) {
        reject(e)
      }
    })
}

export { disconnect }
