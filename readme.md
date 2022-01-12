
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
