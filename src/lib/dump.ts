import { dump as pm2dumb } from 'pm2'

/**
 * @description
 *  Writes the process list to a json file at the path in the DUMP_FILE_PATH environment variable
 * (“~/.pm2/dump.pm2” by default).
 * @returns Promise<string>
 * @throws Error
 */
const dump: () => Promise<string>
  = (): Promise<string> => {
    return new Promise((resolve: (result: string) => void, reject: (reason: Error) => void): void => {
      pm2dumb((err: Error, result: string) => {
        err ? reject(err) : resolve(result)
      })
    })
}

export { dump }
