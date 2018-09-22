import { killDaemon as pm2killDaemon } from 'pm2'

/**
 * @description
 * Kills the pm2 daemon (same as pm2 kill). Note that when the daemon is killed, all its processes are also killed.
 * Also note that you still have to explicitly disconnect from the daemon even after you kill it.
 * @returns Promise<void>
 * @throws Error
 */
const killDaemon: () => Promise<void>
  = (): Promise<void> => {
    return new Promise((resolve: () => void, reject: (reason: Error) => void): void => {
      pm2killDaemon((err: Error) => {
        err ? reject(err) : resolve()
      })
    })
}

export { killDaemon }
