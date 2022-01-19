const LoaderUtils = require('loader-utils');
module.exports = function(source) {
  console.log(source, 'source', this.query)
  const Options = LoaderUtils.getOptions(this)
  console.log(Options, 'options')
  // return source.replace('hch', Options.name)
  console.log(this.callback.toString(), 'callback')
  const callback = this.async() //  异步loader
  setTimeout(() => {
    const result = source.replace('hch', Options.name)
    callback(null, result)
  }, 2000)
  // const result = source.replace('hch', Options.name)
  // this.callback(null, result)
  // return result
}