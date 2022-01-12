const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
  entry: {
    main: "./src/index.js", // key为打包后的名字
    // sub: "./src/index.js",
  },
  module: {
    rules: [
      {
        test: /\.(jpg|png|gif)$/,
        use: {
          loader: "file-loader",
          options: {
            // placeholder 占位符
            name: "[name].[ext]",
            outputPath: "images/",
            esModule: false, // file-loader 在5.0.0版本中默认开启esModule
            limit: 2048,
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          // "css-loader",
          {
            loader: "css-loader",
            // options: {
            // importLoaders: 2,  // 多重引用
            // modules: true, // 开启CSS modules
            // }
          },
          "sass-loader",
          "postcss-loader",
        ],
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: {
          loader: "file-loader",
          options: {
            esModule: false,
            name: "font/[name].[ext]",
          },
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        // options: {
        //   //  业务代码可用
        //   // polyfill 会污染全局环境
        //   // presets: [['@babel/preset-env', {
        //   //   targets: {   // 兼容浏览器版本, 高于版本就不转换成es5
        //   //     chrome: '67'
        //   //   },
        //   //   useBuiltIns: 'usage'  // polyfill  将项目中用到的高级es6语法转换，没用到的不转换
        //   // }]] // 语法转换 es6 --> es5
        //   // 写组件库之内的
        //   // 运用闭包，不会污染环境
        //   plugins: [
        //     [
        //       "@babel/plugin-transform-runtime",
        //       {
        //         // absoluteRuntime: false,
        //         corejs: 2,
        //         helpers: true,
        //         regenerator: true,
        //         useESModule: false,
        //         // version: "7.0.0-beta.0",
        //       },
        //     ],
        //   ],
        // },
      },
    ],
  },
  plugins: [
    // 打包后运行
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    // 打包前先删除对应文件夹， 打包前运行
    new CleanWebpackPlugin(["dist"]),
  ],
  output: {
    // publicPath: path.join(__dirname, "./dist/"), // 提供打包后文件引用的前缀
    // filename: "main.js",
    // publicPath: '/',
    filename: "[name].js", // name 表示entry中的key, 打包多个文件可用
    path: path.resolve(__dirname, "../dist"),
  },
}