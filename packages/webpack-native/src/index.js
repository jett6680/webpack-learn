const name = require('./name')
const age = require('./age')

export default function say() {
  console.log('info', name, age)
}