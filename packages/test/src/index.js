
import './index.less'
import jett from './index.jett'

function render() {
  const dom = document.createElement('div')
  dom.innerText = 'Hello word'
  dom.classList.add('title')

  document.body.appendChild(dom)
  console.log(jett)
}

render()
