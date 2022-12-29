const CLoader = function (source, sourceMap, data) {
  console.log('c-loader normal---')
  return source + '\n // c-loader 的注释'
}

CLoader.pitch = function () {
  console.log('c-loader patch')
}

module.exports = CLoader
