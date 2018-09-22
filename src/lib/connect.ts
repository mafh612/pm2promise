import { connect as pm2connect } from 'pm2'

/**
 * @description
 * Either connects to a running pm2 daemon (“God”) or launches and daemonizes one.
 * Once launched, the pm2 process will keep running after the script exits.
 * @returns Promise<void>
 * @throws Error
 */
const connect: (noDaemonMode?: boolean) => Promise<void> = (noDaemonMode?: boolean): Promise<void> => {
  return new Promise((resolve: () => void, reject: (reason: Error) => void): void => {
    if (noDaemonMode) pm2connect(false, (err: Error) => err ? reject(err) : resolve())
    pm2connect((err: Error) => err ? reject(err) : resolve())
  })
}

export { connect }
