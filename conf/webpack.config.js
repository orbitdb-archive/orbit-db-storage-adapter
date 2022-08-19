'use strict'

const path = require('path')
const webpack = require('webpack')

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    libraryTarget: 'var',
    library: 'Storage',
    filename: '../dist/orbitdb-storage.min.js'
  },
  target: 'web',
  devtool: 'source-map',
  externals: {
    fs: '{}',
    mkdirp: '{}'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    })
  ],
  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, '../node_modules')
    ],
    alias: {
      leveldown: 'level-js'
    }
  },
  resolveLoader: {
    modules: [
      'node_modules',
      path.resolve(__dirname, '../node_modules')
    ],
    extensions: ['.js', '.json'],
    mainFields: ['loader', 'main']
  }
}
