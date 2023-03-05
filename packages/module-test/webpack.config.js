const path = require('path')

module.exports = {
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist')
  },
  entry: './src/main.js',
  devtool: 'source-map'
}