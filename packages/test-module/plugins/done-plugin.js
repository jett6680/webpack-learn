class DonePlugin {
  apply(compiler) {
    compiler.hooks.done.tap("DonePlugin", () => {
      console.log('编译完成的插件')
    })
  }
}
module.exports = DonePlugin
