const Merge = require('webpack-merge')
const path = require('path')
const baseConfig = require('./webpack.base.config')

module.exports = Merge.merge(baseConfig, {
  entry: {
    server: path.resolve(__dirname, './src/entry-server.tsx')
  },
  target: 'node',
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: "commonjs2"
  }
})
