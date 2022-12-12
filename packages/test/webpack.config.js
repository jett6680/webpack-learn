const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: {
    index: {
      import: path.resolve(__dirname, './src/index.js'),
      dependOn: 'shared'
    },
    shared: {
      import: ['lodash']
    }
  },
  module: {
    noParse: /lodash/,
    rules: [
      {
        test: /\.jett/,
        use: [
          {
            loader: path.resolve(__dirname, './my-test-loader.js')
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: path.resolve(__dirname, '../style-loader/dist/cjs.js')
          },
          {
            loader: path.resolve(__dirname, '../css-loader/dist/cjs.js')
          },
          {
            loader: path.resolve(__dirname, '../less-loader/dist/cjs.js')
          }
        ]
      }
    ]
  },
  output: {
    filename: '[name]-[hash]-[chunkhash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './index.html')
    })
  ],
  optimization: {
    minimize: false,
    runtimeChunk: {
      name: "runtime"
    }
  }
}

// 通过在entry配置公共文件 shared: ['lodash', 'react', 'react'] 在加上externals 的配置 可以分离出公共包
// 通过splitChunks也可以，那么这两种做法有什么区别?
