const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
// plugins 可以在webpack运行在某个时刻，做一些事情。

module.exports = {
  mode: "development",
  // 构建映射关系，将源代码和打包后的代码映射起来， source-map 能够产生.map文件，能够知道源代码哪里错了
  // inline-source-map， 会将.map文件打包后放在main.js中
  // cheap-inline-source-map 只知道哪一行出错，不知道哪一列出错， 只打包业务代码
  // eval 
  //development 最佳 cheap-module-eval-source-map
  // production: cheap-module-source-map
  devtool: "cheap-module-eval-source-map",
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
          "postcss-loader"
        ],
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: {
          loader: 'file-loader',
          options: {
            esModule: false,
            name: 'font/[name].[ext]'
          }
        },
      }
    ],
  },
  plugins: [
    // 打包后运行
    new HtmlWebpackPlugin({ 
    template: './public/index.html'
  }),
  // 打包前先删除对应文件夹， 打包前运行
    new CleanWebpackPlugin(['dist']) 
],
  output: {
    // publicPath: path.join(__dirname, "./dist/"), // 提供打包后文件引用的前缀
    // filename: "main.js",
    filename: '[name].js', // name 表示entry中的key, 打包多个文件可用
    path: path.resolve(__dirname, "dist"),
  },
};
