const WebpackMerge = require('webpack-merge')
const config = require('./webpack.config')

module.exports = WebpackMerge.merge(config, {
  devServer: {
    port: 9000,
    open: false,
    hot: true,
    compress: true
  }
})

