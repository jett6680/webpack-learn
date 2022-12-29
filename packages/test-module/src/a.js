import getMes from './b'

console.log('我是 a 文件')

export const say = function(){
  const message = getMes()
  console.log(message)
}
