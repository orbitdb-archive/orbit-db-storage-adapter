// const mongoUnit = require('mongo-unit')
// const spawn = require('child_process').spawn
// const exec = require('child_process').exec

import level from "level"
import memdown from "memdown"

export default [
  {
    key: 'level',
    type: 'node',
    module: level
  },
  {
    key: 'memdown',
    type: 'node',
    module: memdown
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
