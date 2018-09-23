import { sendSignalToProcessName as pm2sendSignalToProcessName } from 'pm2'

/**
 * @description
 * none
 * @returns Promise<string>
 * @throws Error
 */
const sendSignalToProcessName: (signal: string|number, process: string|number) => Promise<string>
  = (signal: string|number, process: string|number): Promise<string> => {
    return new Promise((resolve: (result: string) => void, reject: (reason: Error) => void): void => {
      pm2sendSignalToProcessName(signal, process, (err: Error, result: string) => {
        err ? reject(err) : resolve(result)
      })
    })
}

export { sendSignalToProcessName }
