const path = require('path')
const DonePlugin = require('./plugins/done-plugin')

module.exports = {
  mode: "development",
  devtool: false,
  entry: {
    main: path.resolve(__dirname, './index.js')
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  resolveLoader: {
    modules: ['loaders', 'node_modules']
  },
  plugins: [new DonePlugin()],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['a-loader']
      },
      {
        test: /\.js$/,
        use: ['b-loader'],
        enforce: 'post'
      }
    ]
  }
}
