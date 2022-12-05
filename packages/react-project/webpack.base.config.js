module.exports = {
  resolve: {
    extensions: [".tsx", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.tsx$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                ['@babel/preset-react', {runtime: 'automatic'}],
                '@babel/preset-typescript'
              ]
            }
          }
        ]
      }
    ]
  }
}
