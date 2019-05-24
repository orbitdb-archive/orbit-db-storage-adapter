const implementations = [
  {
    key: 'level-js',
    module: require('level-js')
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
    key: 'fruitdown',
    module: require('fruitdown')
  }
]

module.exports = implementations
