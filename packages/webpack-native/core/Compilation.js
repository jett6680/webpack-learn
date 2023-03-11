class Compilation {
  constructor(options) {
    this.options = options
    /**
     * 本次编译所有生成出来的模块
     */
    this.modules = []
    /**
     * 本次编译产出的所有代码块，入口模块和依赖的模块打包在一起为代码块
     */
    this.chunks = []
    /**
     * 本次编译产出的资源文件
     */
    this.assets = {}
    /**
     * 本次打包涉及到的文件，这里主要是为了实现watch模式下监听文件的变化，文件发生变化后会重新编译
     */
    this.fileDependencies = []
  }

  /**
   * @param {Function} callback 构建结束的回调函数
   */
  build(callback) {
    console.log('do build')
    callback()
  }
}

module.exports = Compilation