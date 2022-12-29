const ALoader = function (source, sourceMap, data) {
  console.log('a-loader normal---')
  return source + '\n // a-loader 的注释'
}

ALoader.pitch = function () {
  console.log('a-loader patch')
}

module.exports = ALoader
