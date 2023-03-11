const Compiler = require('./Compiler')

/**
 * 
 * @param { Object } options 用户传入的配置
 * @returns { Object } parseOptions 经过标准化的配置
 */
webpack._initOptions = function (options) {
  const parseOptions = { ...options }
  if (typeof options.entry === 'string') {
    parseOptions.entry = {
      main: options.entry
    }
  }

  parseOptions.cwd = process.cwd()

  return parseOptions
}

function webpack(webpackOptions) {
  const options = webpack._initOptions(webpackOptions)
  const compiler = new Compiler(options)

  const { plugins = [] } = options

  for (let i = 0; i < plugins.length; i++) {
    plugins[i].apply(compiler)
  }

  return compiler
}

module.exports = webpack
