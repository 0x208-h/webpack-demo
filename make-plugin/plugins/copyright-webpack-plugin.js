class CopyrightWebpackPlugin {
  constructor(options) {
    console.log("Copyright Webpack Plugin", options);
  }
  // 主要 关键
  apply(compiler) {
    console.log("compiler", compiler.hooks.emit.tapAsync.toString());
    // tap 用于同步 tapAsync用于异步
    compiler.hooks.compile.tap('CopyrightWebpackPlugin', (compilation) => {
      console.log("compilation", compilation)
    })
    compiler.hooks.emit.tapAsync('CopyrightWebpackPlugin', (compilation, callback) => {
      // console.log("compilation", compilation.assets, callback);
      debugger;
      compilation.assets['copyright.txt'] = {
        source: function() {
          return 'copyright by hch'
        },
        size: function() {
          return 16;
        }
      }
      callback();
    })
  }
}
module.exports = CopyrightWebpackPlugin