const { SyncHook } = require('tapable')
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

    const onCompiled = () => {
      this.hooks.done.call()
    }

    this.compile(onCompiled)

  }
}

module.exports = Compiler