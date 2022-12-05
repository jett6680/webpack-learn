// @ts-ignore
import path from 'path'
// @ts-ignore
import fs from 'fs'
import express from 'express'
import { renderToString } from 'react-dom/server'
import App from "./App"

const template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf8')
const server = express()

server.use(express.static("./dist"))

server.get('/', (req, res) => {
  const html = renderToString(<App />)
  res.send(template.replace(`<div id="root"></div>`, `<div id="root">${ html }</div>`))
})

server.listen(3333, () => {
  console.log('server start at port 3333')
})
