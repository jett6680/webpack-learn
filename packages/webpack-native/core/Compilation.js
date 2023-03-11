const fs = require('fs')
const path = require('path')
const parser = require("@babel/parser")
let types = require("@babel/types")
const traverse = require("@babel/traverse").default
const generator = require("@babel/generator").default


function tryExtensions(modulePath, extensions) {
  if (fs.existsSync(modulePath)) {
    return modulePath;
  }
  for (let i = 0; i < extensions.length; i++) {
    let filePath = modulePath + extensions[i];
    if (fs.existsSync(filePath)) {
      return filePath;
    }
  }
  throw new Error(`无法找到${modulePath}`);
}

function getSource(chunk) {
  console.log(chunk)
  return `
    (() => {
      var modules = {
        ${
          chunk.modules
              .filter(module => module.id !== chunk.entryModule.id)
              .map(module => `\n"${module.id}": (module) => {\n${module.source}\n}`)
              .join(',')
        }
      }
      var cache = {}
      function require(moduleId) {
        var cacheModule = cache[moduleId]
        if(cacheModule !== undefined) {
          return cacheModule.exports
        }
        var module = cache[moduleId] = {
          exports: {}
        }
        modules[moduleId](module, module.exports, require)
        return module.exports
      }
      var exports = {};
      (() => {
        ${chunk.entryModule.source}
      })()
    })()
  `
}

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
   * @param { String } moduleName 模块名称
   * @param { String } modulePath 模块的路径
   * @returns { Object } module 当前文件构建的模块
   */
  buildModule(moduleName, modulePath) {
    let sourceCode = fs.readFileSync(modulePath, 'utf-8')
    const moduleId = `./${path.relative(this.options.cwd, modulePath)}`
    const module = {
      id: moduleId,
      names: [moduleName],
      dependencies: [],
      source: ''
    }

    // 将模块的代码使用loader处理
    const execLoaders = []
    const {rules = []} = this.options.module
    for (let i = 0; i < rules.length; i++) {
      if (modulePath.match(rules[i].test)) {
        execLoaders.push(...rules[i].use)
      }
    }
    sourceCode = execLoaders.reduceRight((code, loader) => {
      return loader(code)
    }, sourceCode)

    // 使用ast, 将经过loader处理的代码转化成ast
    // 这样就能分析出当前模块依赖的模块

    const {resolve = {}} = this.options
    const {extensions = ['.js']} = resolve
    const ast = parser.parse(sourceCode, {sourceType: "module"})
    traverse(ast, {
      CallExpression: (nodePath) => {
        const {node} = nodePath
        if (node.callee.name === 'require') {
          const depModuleName = node.arguments[0].value
          const dirname = path.dirname(modulePath)
          let depModulePath = path.join(dirname, depModuleName)
          depModulePath = tryExtensions(depModulePath, extensions)
          this.fileDependencies.push(depModulePath)
          const depModuleId = `./${path.relative(this.options.cwd, depModulePath)}`
          node.arguments = [types.stringLiteral(depModuleId)];
          module.dependencies.push({depModuleId, depModulePath})
        }
      }
    })

    const {code} = generator(ast)
    module.source = code
    module.dependencies.forEach(({depModuleId, depModulePath}) => {
      const existModule = this.modules.find((item) => item.id === depModuleId);
      if (existModule) {
        existModule.names.push(moduleName)
      } else {
        const depModule = this.buildModule(moduleName, depModulePath);
        this.modules.push(depModule);
      }
    })
    return module
  }

  /**
   * @param {Function} callback 构建结束的回调函数
   */
  build(callback) {
    const entry = this.options.entry
    for (let entryName in entry) {
      this.fileDependencies.push(entry[entryName])
      const entryModule = this.buildModule(entryName, entry[entryName])
      this.modules.push(entryModule)
      const chunk = {
        name: entryName,
        entryModule,
        modules: this.modules.filter(item => item.names.includes(entryName))
      }
      this.chunks.push(chunk)
    }
    this.chunks.forEach(chunk => {
      const filename = this.options.output.filename.replace("[name]", chunk.name)
      this.assets[filename] = getSource(chunk)
    })
    callback(
      null,
      {
        chunks: this.chunks,
        modules: this.modules,
        assets: this.assets
      },
      this.fileDependencies
    )
  }
}

module.exports = Compilation
