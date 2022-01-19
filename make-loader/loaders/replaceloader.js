const LoaderUtils = require('loader-utils');
module.exports = function(source) {
  // source 是源代码
  // 不能使用箭头函数, 因为里面要使用this
  console.log(source, 'source', this.query)
  const Options = LoaderUtils.getOptions(this)
  console.log(Options, 'options')
  // return source.replace('hch', Options.name)
  // console.log(this.callback.toString(), 'callback')
  // const callback = this.async() //  异步loader
  // setTimeout(() => {
  //   const result = source.replace('hch', Options.name)
  //   callback(null, result)
  // }, 2000)
  const result = source.replace('HCH', 'World')
  // this.callback(null, result)
  return result
}