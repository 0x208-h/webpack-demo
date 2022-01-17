
const Webpack = require("webpack");
// const merge = require("webpack-merge");
// const CommonConfig = require("./webpack.common")
// plugins 可以在webpack运行在某个时刻，做一些事情。
const DevConfig = {
  mode: "development",
  // 构建映射关系，将源代码和打包后的代码映射起来， source-map 能够产生.map文件，能够知道源代码哪里错了
  // inline-source-map， 会将.map文件打包后放在main.js中
  // cheap-inline-source-map 只知道哪一行出错，不知道哪一列出错， 只打包业务代码
  // eval
  //development 最佳 cheap-module-eval-source-map
  // production: cheap-module-source-map
  devtool: "cheap-module-eval-source-map",
  devServer: {
    contentBase: "./dist", // 打包后的根目录
    open: true, // 启动后是否打开浏览器
    proxy: { // 代理
      '/react/api': 'http://www.dell-lee.com'
      // '/react/api': {
				// target: 'https://www.dell-lee.com',
				// secure: false, // 代理https请求
				// pathRewrite: {
				// 	'header.json': 'demo.json'
				// },
      // }
    },
    // port: 3000 //端口号
    hot: true, // 开启HMR hot module replacement
    // hotOnly: true, // 如果页面失效，不让 webpack-dev-server 重新刷新页面，让他失效
  },
  module: {
    rules: [
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
    ]
  },
  plugins: [
    new Webpack.HotModuleReplacementPlugin(),
  ],
  //  production 模式下 下面代码 可删除
  // optimization: {
  //   usedExports: true,
  // },
  output: {
    filename: "[name].js", // name 表示entry中的key, 打包多个文件可用
    chunkFilename: '[name].chunk.js',
  }
};

module.exports =  DevConfig