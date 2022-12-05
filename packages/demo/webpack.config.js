const path = require('path')
const ESLintPlugin = require('eslint-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'

function calcPlugin() {
  const plugins = []
  plugins.push(new HtmlWebpackPlugin())
  plugins.push(new ESLintPlugin({
    extensions: ['.js', '.ts']
  }))
  if (!isDev) {
    plugins.push(new MiniCssExtractPlugin())
  }
  return plugins
}

module.exports = {
  mode: process.env.NODE_ENV,
  entry: path.resolve(__dirname, './src/index.ts'),
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        use: [
          // style-loader 和 MiniCssExtractPlugin 是互斥的
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.(js|ts)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                // 方法1：利用babel的preset处理ts 不会对ts的类型做校验
                // 类型错了不会报错
                '@babel/preset-typescript'
              ]
            }
          }
        ]
      },
      // {
      //   test: /\.ts$/,
      //   // 方法2：利用ts-loader对ts文件处理，会校验ts的类型
      //   // 类型错了会报错 但是效率会相对较低
      //   use: ['ts-loader']
      // }
    ]
  },
  plugins: calcPlugin()
}
