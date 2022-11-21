export default [
  {
    key: 'level-js',
    type: 'browser',
    module: (await import('level-js')).default
  },
  {
    key: 'memdown',
    type: 'browser',
    module: (await import('memdown')).default
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
