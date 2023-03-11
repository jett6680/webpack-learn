const Compiler = require('./Compiler')

function webpack(options) {
  const compiler = new Compiler(options)

  const { plugins = [] } = options

  for(let i = 0; i< plugins.length; i++) {
    plugins[i].apply(compiler)
  }

  return compiler
}

module.exports = webpack
