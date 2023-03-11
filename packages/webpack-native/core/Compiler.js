const fs = require('fs')
const path = require('path')
const {SyncHook} = require('tapable')
const Compilation = require('./Compilation')

class Compiler {
  constructor(options) {
    this.options = options
    this.hooks = {
      run: new SyncHook(),
      done: new SyncHook()
    }
  }
  /**
   * @param {Function} callback 构建结束的回调函数
   */
  compile(callback) {
    const compilation = new Compilation(this.options)
    compilation.build(callback)
  }

  run(callback) {
    // 执行开始构建的钩子
    this.hooks.run.call()

    // fileDependencies 是所有依赖的文件的路径, 可根据这些路径对文件做监听
    // 当修改的时候 重新compile
    const onCompiled = (err, stats, fileDependencies) => {

      for (let filename in stats.assets) {
        const filePath = path.join(this.options.output.path, filename);
        fs.writeFileSync(filePath, stats.assets[filename], "utf8");
      }
      callback(err, {
        toJson: () => stats
      })
      this.hooks.done.call()
    }
    this.compile(onCompiled)
  }
}

module.exports = Compiler
