import leveljs from "level-js"
import memdown from "memdown"

export default [
  {
    key: 'level-js',
    type: 'browser',
    module: leveljs
  },
  {
    key: 'memdown',
    type: 'browser',
    module: memdown
  }
  //  {
  //   key: 'localdown',
  //   type: 'browser',
  //   module: require('localstorage-down')
  // },
  // {
  //   key: 'fruitdown',
  //   type: 'browser',
  //   module: require('fruitdown')
  // }
]
