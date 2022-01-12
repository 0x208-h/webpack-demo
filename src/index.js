// import '@babel/polyfill' // 兼容低版本的实现 像map方法
// const arr = [
//   new Promise(() => {}),
//   new Promise(() => {})
// ]

// arr.map(item => {
//   console.log(item)
// })

import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  return <div>Hello World!</div>  
}

ReactDOM.render(<App />, document.getElementById('root'))