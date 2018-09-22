import { describe as pm2describe, ProcessDescription } from 'pm2'

/**
 * @description
 *  Returns various information about a process: eg what stdout/stderr and pid files are used.
 * @param process string|number
 * @returns Promise<ProcessDescription[]>
 * @throws Error
 */
const describe: (process: string|number) => Promise<ProcessDescription[]>
  = (process: string|number): Promise<ProcessDescription[]> => {
    return new Promise((resolve: (pd: ProcessDescription[]) => void, reject: (reason: Error) => void): void => {
      pm2describe(process, (err: Error, pd: ProcessDescription[]) => {
        err ? reject(err) : resolve(pd)
      })
    })
}

export { describe }
