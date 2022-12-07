const path = require('path')

module.exports = {
  mode: 'production',
  entry: {
    index: path.resolve(__dirname, './src/index.js'),
    detail: path.resolve(__dirname, './src/detail.js')
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  }
}