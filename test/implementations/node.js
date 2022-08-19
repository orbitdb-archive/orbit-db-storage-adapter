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
]
