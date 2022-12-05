const Merge = require('webpack-merge')
const path = require('path')
const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const baseConfig = require('./webpack.base.config')

module.exports = Merge.merge(baseConfig, {
  entry: {
    client: path.resolve(__dirname, './src/entry-client.tsx')
  },
  output: {
    filename: 'client.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.html')
    })
  ]
})
