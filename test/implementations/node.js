// const mongoUnit = require('mongo-unit')
// const spawn = require('child_process').spawn
// const exec = require('child_process').exec

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
  }
  // Disabling for now since it was breaking CI builds, but keep it available
  // {
  //   key: 'mongodown',
  //   type: 'node',
  //   module: require('mongodown'),
  //   fileName: 'mongodb://localhost:27017/test',
  //   server: {
  //     afterEach: async () => mongoUnit.drop(),
  //     start: async (opts) => mongoUnit.start(opts),
  //     stop: async () => mongoUnit.stop()
  //   }
  // },
  // {
  //   key: 'redisdown',
  //   type: 'node',
  //   module: require('redisdown'),
  //   server: {
  //     start: () => {
  //       return new Promise((resolve, reject) => {
  //         const server = new RedisServer(6379);
  //         server.open((err) => {
  //           if (err === null) {
  //             reject(err)
  //           }
  //           resolve()
  //         })
  //       })
  //     },
  //     afterEach: async () => {},
  //     stop: async () => {
  //       const server = new RedisServer(6379);
  //       server.stop()
  //     }
  //   }
  // }
]
