const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  mode: 'development',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  entry: {
    main: './src/main.js'
  },
  devtool: false,
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, './index.html')
    })
  ]
}