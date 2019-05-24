const mongoUnit = require('mongo-unit')
const spawn = require('child_process').spawn
const exec = require('child_process').exec

const implementations = [
  {
    key: 'leveldown',
    module: require('leveldown')
  },
  {
    key: 'memdown',
    module: require('memdown')
  },
  {
    key: 'localdown',
    module: require('localstorage-down')
  },
  {
    key: 'jsondown',
    module: require('jsondown'),
    fileName: 'orbitdb.json'
  },
  {
    key: 'sqldown',
    module: require('sqldown'),
    fileName: 'orbitdb.sql'
  },
  {
    key: 'mongodown',
    module: require('mongodown'),
    fileName: 'mongodb://localhost:27017/test',
    server: {
      afterEach: async () => mongoUnit.drop(),
      start: async (opts) => mongoUnit.start(opts),
      stop: async () => mongoUnit.stop()
    }
  },
  {
    key: 'redisdown',
    module: require('redisdown'),
    server: {
      start: async () => {
        await spawn('./node_modules/.bin/redis-server')
      },
      afterEach: async () => {},
      stop: async () => {
        await exec('killall redis-server')
      }
    }
  }
]

if (process.env.TEST && process.env.TEST !== 'all') {
  module.exports = {}
  module.exports = implementations.filter(i => i.key === process.env.TEST)
} else {
  module.exports = implementations
}
