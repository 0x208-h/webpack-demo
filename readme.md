# Webpack

## loader

- file-loader 会将文件打包到 dist 目录下，并返回一个文件名 可以打包静态资源 字体 图片等
- url-loader limit 作限制, 如果是大于 limit 值, 会将打包成一张图片，否则就打包成 base64
- css-loader 分析 css 文件之间的关系，将它们组合成一段 CSS
- style-loader 将 css 挂载到 style 标签上
- sass-loader node-sass 打包 sass 文件
- postcss-loader 兼容 css3
- babel-loader es6 --> es5

  - 其他依赖
  - @babel/core
  - ---------------- 这种打包回污染全局环境
  - @babel/polyfill
  - @babel/preset-env

  ***

  - @babel/plugin-transform-runtime
  - @babel/runtime
  - @babel/runtime-corejs2

- imports-loader 更改 this 指向
- ts-loader 打包 TS, 根目录需要 tsconfig.json
- thread-loader 多进程打包

```js
 {
    test: /\.js$/,
    exclude: /node_modules/,
    // loader: "babel-loader",
    use: ["babel-loader", "imports-loader?this=>window"],
  },
```

打包字体出错的原因是路径问题，因为 index.html 是放在 public 目录下，而视频里面是放在打包后 dist 目录下，所以路径出错，解决问题的方案

```js
   output: {
    publicPath: path.join(__dirname, "./dist/"), //选项指定在浏览器中所引用的「此输出目录对应的公开 URL」 默认 index.html路径
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
```

[详见](https://webpack.docschina.org/configuration/output/#outputpublicpath)

## plugin

- html-webpack-plugin 会在打包结束后，自动生成一个 html 文件，并把打包生成的 js 自动引入到这个 html 文件中
- clean-webpack-plugin 在打包前，会先检查有没有打包后的文件，有得话会将其删除掉，然后在执行打包
- webpack-dev-server 会将打包后的文件，然后在本地启动一个服务

  ```http
  https://v4.webpack.js.org/configuration/dev-server/
  https://github.com/chimurai/http-proxy-middleware#options
  ```

- MiniCssExtractPlugin 不好之处 支持 HMR， 开发环境不合适安装, CSS 代码分割
- optimize-css-assets-webpack-plugin CSS 代码合并
- workbox-webpack-plugin 使用 serviceWorker 做缓存，页面服务挂了，当前页面没影响

```js
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("registed", registration);
      })
      .catch((err) => {
        console.log("err", err);
      });
  });
}
```

## 补充

- Tree Shaking

  - 用于描述移除 JavaScript 上下文中的未引用代码
  - 只支持 ES Module 因为 Tree Shaking 只支持 静态引入(import 底层是静态引入)， Command JS 是动态引入(require 引入)

  - package.json 中 sideEffects 中可以是 boolean 值， false 表示全部使用 tree shaking, 也可是一个数组，里面包含的是不需要 tree shaking 的文件 如 ["*.css", "@babel/polly-fill"]

  - 开发环境 只会提示那个未被引用，并不会真正删除代码
  - production tree shaking 已经配好了

  ```js
  /*! exports provided: add, minus */
  /*! exports used: add */
  ```

  webpack-merge 合并 webpack 配置
  development 与 production

  - 代码压缩
  - production 多了一些配置 比如 Tree Shaking source-map 不同
  - development 可以 webpack-dev-server 起服务 HMR Hot Module Replacement

  代码分割，和 webpack 无关
  webpack 方式

  - 同步代码 只需要在 webpack.common.js 中做 optimization 的配置
  - 异步代码(import): 无需做任何配置， 会自动进行代码分割，放置到新的文件中

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

  - 首先，检查 chunk 属性是同步(initial)还是异步(async)，或者是(all), initial 只对同步代码起效果，以此内推

  - 大于 minSize，才会做代码分割

  - maxSize: 50000, 如果需要打包的文件大于 maxSize, 则会尝试进行二次拆分，最大文件为 50000b，但是一般拆分不了

  - minChunks: 1, 大于等于 minChunks 才会进行代码分割, 比如 lodash.js 被打包后的文件(打包后的每一个文件都是一个 chunk)引用 minChunks 次,lodash.js 会就行代码分割

  - maxAsyncRequests: 5 最多加载 5 个请求， 当打包的库文件大于 5 个, 前 5 个会生成 js 文件，后面的文件就不会进行代码分割
  - maxInitialRequests : 3 首页或者入口文件进行加载时，进行代码分割，最多会分成 3 个文件， 超过 3 个，就不会进行代码分割
  - name: true 对打包生成的文件名起作用, 如果是 false, 打包后的名字是 0.js, 如果是 true, 打包后的文件名是 (vendors| default) ~ main.入口文件名字.js （如果是入口文件的名字是 main 的话，(vendors| default) ~ main.js）

  ```js
  entry: {
    main: "./src/index.js", // key为打包后的名字
  },
  ```

  - automaticNameDelimiter：打包生成的文件名字的连字符
  - 进入 cacheGroups，进入 vendors 组里面， 判断是不是 node_modules 目录里面的，如果是，则将代码分割到 vendors 组里面，否则，进入 default 组里面

  - priority 优先级 如果需要打包的文件符合 cacheGroups 里面的两个组(vendors 和 default)(default 里面没有 test 属性)里，优先级越高，就放在哪个组里。

  - reuseExistingChunk 如果某个模块(比如 B)被打包之后，后面还有其他地方这个模块后，后面这个模块就不会被打包， 直接复用之前已经打包好的那个模块
  - cacheGroups 会等需要打包的文件全部进入缓存组里面，最后一起打包。
    注意：
    缓存组设置 filename 时，在 chunks 项配置为 inital 时才会生效，我们分割同步代码时，可以设置 chunk 为 inital，这样就可以自定义 filename 了。
    加载异步代码时，缓存组不应该设置 filename, 如果想改变打包后的名字，可以将 cacheGroups 中的两个组都配置为 false, 在异步加载代码是设置 webpackChunkName 来改变打包后的名字。

  ```js
  function getComponent() {
    return import(/* webpackChunkName: "lodash" */ "lodash").then(
      ({ default: _ }) => {
        const element = document.createElement("div");
        element.innerHTML = _.join(["H", "C", "H"], "-");
        return element;
      }
    );
  }

  getComponent().then((element) => {
    document.body.appendChild(element);
  });
  ```

  [打包分析](https://github.com/webpack/analyse)

  F12 打开控制台 shift + command + p 搜索 coverage 点击白点，然后可以看见代码覆盖率

  prefetch/preload

  ```js
  /* webpackPrefetch: true */
  /* webpackPreload: true */
  import(/* webpackPrefetch: true */ "./path/to/LoginModal.js");
  ```

  [详见](https://webpack.docschina.org/guides/code-splitting/#prefetchingpreloading-modules)

  区别：

  - preload chunk 会在父 chunk 加载时，以并行方式开始加载。prefetch chunk 会在父 chunk 加载结束后开始加载。
  - preload chunk 具有中等优先级，并立即下载。prefetch chunk 在浏览器闲置时下载。
  - preload chunk 会在父 chunk 中立即请求，用于当下时刻。prefetch chunk 会用于未来的某个时刻。
  - 浏览器支持程度不同。

  注意：提升前端代码性能的方面，通过懒加载影响用户体验，并不是利用缓存更好，而是代码覆盖率 code coverage

  output 属性

  ```js
   output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'library.js',
    // 打包库文件
    library: 'library', // 能使用script引入
    libraryTarget: 'umd' // umd 不管是commonJS AMD CMD
  }
  ```

  webpack.config.js

  ```js
  externals: ['lodash'] //打包的时候忽略lodash库文件
  // externals: 'lodash', // 忽略库文件
  externals: {
    lodash: {
      commonjs: 'lodash' // 表示commonjs下 引入lodash库名字必须为lodash
      // const lodash = require('lodash')
    }
  },
  ```

  http-server 本地起一个服务

  webpack提高打包速度
  - thread-loader, parallel-webpack, happypack 多进程打包
  - 合理使用sourceMap
  - stats分析打包结果
  - 开发环境内存编译
  - 开发环境剔除不必要的插件
