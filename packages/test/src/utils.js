import { debounce } from 'lodash'

function Utils() {
  return debounce(() => {
    console.log('lodash debounce')
  }, 300)
}

export function myTest() {
  console.log('--======')
}

export default Utils
