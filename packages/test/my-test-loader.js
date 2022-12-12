
// 导出的必须是function 不能是箭头函数
// 因为箭头函数没有this

module.exports = function (source, sourceMap, data) {
  const slice  = source.split('\n').filter(str => !!str)
  let template = `[`
  for(let i = 0; i< slice.length; i++) {
    template += slice[i] + ','
  }
  template += ']'
  return `
    module.exports = ${template}
  `
}
