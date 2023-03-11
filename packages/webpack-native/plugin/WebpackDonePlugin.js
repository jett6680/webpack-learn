class WebpackDonePlugin {
  apply(compiler) {
    compiler.hooks.done.tap('WebpackDonePlugin', () => {
      console.log('编译结束')
    })
  }
}

module.exports = WebpackDonePlugin
