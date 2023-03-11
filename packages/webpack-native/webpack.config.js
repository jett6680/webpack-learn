const path = require('path')
const WebpackRunPlugin = require('./plugin/WebpackRunPlugin')
const WebpackDonePlugin = require('./plugin/WebpackDonePlugin')
const loader1 = require('./loaders/loader1')
const loader2 = require('./loaders/loader2')

module.exports = {
  entry: path.resolve(__dirname, './src/index.js'),
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  devtool: 'source-map',
  plugins: [
    new WebpackRunPlugin(),
    new WebpackDonePlugin()
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [ loader1, loader2 ]
      }
    ]
  }
}
