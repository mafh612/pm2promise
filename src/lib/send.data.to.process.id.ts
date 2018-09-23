import { sendDataToProcessId as pm2sendDataToProcessId } from 'pm2'

/**
 * @description
 * none
 * @returns Promise<string>
 * @throws Error
 */
const sendDataToProcessId: (proc_id: number, packet: object) => Promise<string>
  = (proc_id: number, packet: object): Promise<string> => {
    return new Promise((resolve: (result: string) => void, reject: (reason: Error) => void): void => {
      pm2sendDataToProcessId(proc_id, packet, (err: Error, result: string) => {
        err ? reject(err) : resolve(result)
      })
    })
}

export { sendDataToProcessId }
