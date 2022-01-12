
# Webpack

## loader

- file-loader 会将文件打包到dist目录下，并返回一个文件名  可以打包静态资源  字体 图片等
- url-loader limit 作限制, 如果是大于limit值, 会将打包成一张图片，否则就打包成base64
- css-loader 分析css文件之间的关系，将它们组合成一段CSS
- style-loader 将css挂载到style标签上
- sass-loader node-sass 打包sass文件
- postcss-loader 兼容css3
- babel-loader es6 --> es5
  - 其他依赖
  - @babel/core
  - ---------------- 这种打包回污染全局环境
  - @babel/polyfill  
  - @babel/preset-env
  - ----------------
  - @babel/plugin-transform-runtime
  - @babel/runtime
  - @babel/runtime-corejs2

打包字体出错的原因是路径问题，因为index.html 是放在public目录下，而视频里面是放在打包后dist目录下，所以路径出错，解决问题的方案

``` js
   output: {
    publicPath: path.join(__dirname, "./dist/"), //选项指定在浏览器中所引用的「此输出目录对应的公开 URL」 默认 index.html路径
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
```

[详见](https://webpack.docschina.org/configuration/output/#outputpublicpath)

## plugin

- html-webpack-plugin 会在打包结束后，自动生成一个html文件，并把打包生成的js自动引入到这个html文件中
- clean-webpack-plugin 在打包前，会先检查有没有打包后的文件，有得话会将其删除掉，然后在执行打包
- webpack-dev-server 会将打包后的文件，然后在本地启动一个服务,

## 补充

- Tree Shaking

  - 用于描述移除 JavaScript 上下文中的未引用代码
  - 只支持 ES Module 因为 Tree Shaking 只支持 静态引入(import底层是静态引入)， Command JS是动态引入(require引入)

  - package.json 中 sideEffects 中可以是boolean值， false表示全部使用tree shaking, 也可是一个数组，里面包含的是不需要tree shaking的文件 如 ["*.css", "@babel/polly-fill"]
  
  - 开发环境 只会提示那个未被引用，并不会真正删除代码
  - production tree shaking已经配好了

  ``` js
    /*! exports provided: add, minus */
    /*! exports used: add */
  ```

  webpack-merge 合并 webpack配置
  development 与 production

  - 代码压缩
  - production多了一些配置 比如 Tree Shaking source-map不同
  - development 可以 webpack-dev-server起服务 HMR Hot Module Replacement

  代码分割，和webpack无关
  webpack方式
  - 同步代码 只需要在webpack.common.js中做optimization的配置
  - 异步代码(import):  无需做任何配置， 会自动进行代码分割，放置到新的文件中

  - SplitChunksPlugin

  ```js
  optimization: {
    splitChunks: {
      // chunks: 'all', // 代码分割
      // 下面两个属性如果设置成两个false，打包后就不会出现verndors~前缀
      // cacheGroups: {
      //   vendors: false,
      //   default: false
      // },
      chunks: "initial", // 只对异步代码有效 all同步 异步都有效 initial 同步
      minSize: 0, // 大于minSize,才做代码分割
      maxSize: 0, // 尝试二次拆分, 大于maxSize 1mb 
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: "~",
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          // 缓存组设置filename时，在chunks项配置为inital时才会生效，我们分割同步代码时，可以设置chunk为inital，这样就可以自定义filename了。
          filename: 'vendors.js',
        },
        default: {
          // minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
          filename: 'default.js'
        },
      },
    },
  },
  ```

  过程：
  - 首先，检查chunk属性是同步(initial)还是异步(async)，或者是(all), initial只对同步代码起效果，以此内推

  - 大于minSize，才会做代码分割

  - maxSize: 50000, 如果需要打包的文件大于maxSize, 则会尝试进行二次拆分，最大文件为50000b，但是一般拆分不了

  - minChunks: 1, 大于等于minChunks才会进行代码分割

  - maxAsyncRequests: 5 最多加载5个请求， 当打包的库文件大于5个, 前5个会生成js文件，后面的文件就不会进行代码分割
  - maxInitialRequests : 3 首页或者入口文件进行加载时，进行代码分割，最多会分成3个文件， 超过3个，就不会进行代码分割
  - name: true 对打包生成的文件名起作用,  如果是false, 打包后的名字是 0.js, 如果是true, 打包后的文件名是 (vendors| default) ~ main.入口文件名字.js （如果是入口文件的名字是main的话，(vendors| default) ~ main.js）

  ```js
  entry: {
    main: "./src/index.js", // key为打包后的名字
  },
  ```

  - automaticNameDelimiter：打包生成的文件名字的连字符
  - 进入cacheGroups，进入vendors组里面， 判断是不是node_modules目录里面的，如果是，则将代码分割到vendors组里面，否则，进入default组里面

  - priority 优先级 如果需要打包的文件符合cacheGroups里面的两个组(vendors和default)(default里面没有test属性)里，优先级越高，就放在哪个组里。

  - reuseExistingChunk 如果某个模块(比如B)被打包之后，后面还有其他地方这个模块后，后面这个模块就不会被打包， 直接复用之前已经打包好的那个模块
  - cacheGroups 会等需要打包的文件全部进入缓存组里面，最后一起打包。
  注意：
  缓存组设置filename时，在chunks项配置为inital时才会生效，我们分割同步代码时，可以设置chunk为inital，这样就可以自定义filename了。
