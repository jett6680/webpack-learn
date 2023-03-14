// const webpack = require('./core/webpack');
const webpack = require('webpack');
const webpackOptions = require("./webpack.config.js");
const compiler = webpack(webpackOptions);
const fs = require('fs')
//开始编译
compiler.run((err, stats) => {
  console.log(err);
  const json = stats.toJson({
    assets: true, //打印本次编译产出的资源
    chunks: true, //打印本次编译产出的代码块
    modules: true, //打印本次编译产出的模块
  })
  console.log(json)
  fs.writeFileSync('./dist/stats.json', JSON.stringify(json))
});
