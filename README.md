# pm2promise

## install

`npm install pm2promises`

`yarn add pm2promises`


## documentation

[pm2 API documentation](http://pm2.keymetrics.io/docs/usage/pm2-api/)

### example
```typescript
import * as pm2p, { StartOptions, ProcessDescription } from 'pm2promises'

const startOptions: StartOptions = {
  name: 'process',
  script    : 'app.js',
  exec_mode : 'cluster',
  instances : 4,
  max_memory_restart : '100M'
}

await pm2p.connect()
await pm2p.start(startOptions)
await pm2p.disconnect()

const list: ProcessDescription[] = await pm2p.list()
```
