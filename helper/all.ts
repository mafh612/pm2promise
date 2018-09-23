// istanbul ignore next
import * as pm2 from '../src'

// istanbul ignore next
pm2.connect()
// istanbul ignore next
pm2.delete('process')
// istanbul ignore next
pm2.describe('process')
// istanbul ignore next
pm2.dump()
// istanbul ignore next
pm2.flush('process')
// istanbul ignore next
pm2.killDaemon()
// istanbul ignore next
pm2.launchBus()
// istanbul ignore next
pm2.list()
// istanbul ignore next
pm2.reload('process')
// istanbul ignore next
pm2.restart('process')
// istanbul ignore next
pm2.sendDataToProcessId(1, { data: 'test' })
// istanbul ignore next
pm2.sendSignalToProcessName(1, 2)
// istanbul ignore next
pm2.start({ name: 'process', script: 'process.js'})
// istanbul ignore next
pm2.startup('ubuntu')
// istanbul ignore next
pm2.stop('process')
