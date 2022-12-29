const BLoader = function (source, sourceMap, data) {
  console.log('b-loader normal---')
  return source + '\n // b-loader 的注释'
}

BLoader.pitch = function () {
  console.log('b-loader patch')
}

module.exports = BLoader
