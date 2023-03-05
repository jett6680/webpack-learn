const button = document.createElement('button')
button.innerText = '点击'

button.onclick = () => {
  import('./click').then(module => {
    module.default()
  })
}

document.body.append(button)