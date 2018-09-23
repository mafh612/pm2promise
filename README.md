# pm2promise

## install

`npm install pm2promise`

`yarn add pm2promise`


## documentation

[pm2 API documentation](http://pm2.keymetrics.io/docs/usage/pm2-api/)

### example
```typescript
import * as pm2, { StartOptions, ProcessDescription } from '../src'

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
