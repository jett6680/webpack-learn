
// 导出的必须是function 不能是箭头函数
// 因为箭头函数没有this

module.exports = function (source, sourceMap, data) {
  this.emitError(new Error('emit error test'))
  return source
}
