const mongoUnit = require('mongo-unit')
const spawn = require('child_process').spawn
const exec = require('child_process').exec

module.exports = [
  {
    key: 'leveldown',
    type: 'node',
    module: require('leveldown')
  },
  {
    key: 'memdown',
    type: 'node',
    module: require('memdown')
  },
  {
    key: 'localdown',
    type: 'node',
    module: require('localstorage-down')
  },
  {
    key: 'jsondown',
    type: 'node',
    module: require('jsondown'),
    fileName: 'orbitdb.json'
  },
  {
    key: 'sqldown',
    type: 'node',
    module: require('sqldown'),
    fileName: 'orbitdb.sql'
  },
  {
    key: 'mongodown',
    type: 'node',
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
    type: 'node',
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
