'use strict'

const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: './src/index.js',
  output: {
    libraryTarget: 'var',
    library: 'Storage',
    filename: '../dist/orbitdb-storage.min.js'
  },
  target: 'web',
  devtool: 'none',
  externals: {
    fs: '{}',
    mkdirp: '{}'
  },
  node: {
    console: false,
    Buffer: true,
    mkdirp: 'empty'
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
    moduleExtensions: ['-loader']
  }
}
