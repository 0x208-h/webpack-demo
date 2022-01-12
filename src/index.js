import '@babel/polyfill' // 兼容低版本的实现 像map方法
const arr = [
  new Promise(() => {}),
  new Promise(() => {})
]

arr.map(item => {
  console.log(item)
})