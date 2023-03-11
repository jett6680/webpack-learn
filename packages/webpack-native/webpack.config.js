const path = require('path')
const WebpackRunPlugin = require('./plugin/WebpackRunPlugin')
const WebpackDonePlugin = require('./plugin/WebpackDonePlugin')

module.exports = {
  entry: {
    main: path.resolve(__dirname, './src/index.js')
  },
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]-[hash:8].js'
  },
  devtool: 'source-map',
  plugins: [
    new WebpackRunPlugin(),
    new WebpackDonePlugin()
  ]
}
