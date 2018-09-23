import { startup as pm2startup } from 'pm2'

type Platform = 'ubuntu'|'centos'|'redhat'|'gentoo'|'systemd'|'darwin'|'amazon'

/**
 * @description
 * Registers the script as a process that will start on machine boot.
 * Platform can currently be: “ubuntu”, “centos”, “redhat”, “gentoo”, “systemd”, “darwin”, or “amazon”.
 * The current process list will be dumped and saved for resurrection on reboot.
 * @returns Promise<string>
 * @throws Error
 */
const startup: (platform: Platform) => Promise<string>
  = (platform: Platform): Promise<string> => {
    return new Promise((resolve: (result: string) => void, reject: (reason: Error) => void): void => {
      pm2startup(platform, (err: Error, result: string) => {
        err ? reject(err) : resolve(result)
      })
    })
}

export { startup, Platform }
