// const merge = require('webpack-merge');
// const CommonConfig  = require('./webpack.common')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const WorkBoxWebpackPlugin = require('workbox-webpack-plugin');
// plugins 可以在webpack运行在某个时刻，做一些事情。

const ProdConfig = {
  mode: "production",
  // 构建映射关系，将源代码和打包后的代码映射起来， source-map 能够产生.map文件，能够知道源代码哪里错了
  // inline-source-map， 会将.map文件打包后放在main.js中
  // cheap-inline-source-map 只知道哪一行出错，不知道哪一列出错， 只打包业务代码
  // eval
  // development 最佳 cheap-module-eval-source-map
  // production: cheap-module-source-map
  devtool: "cheap-module-source-map",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // "style-loader",
          MiniCssExtractPlugin.loader,
          "css-loader",
        ],
      },
      {
        test: /\.scss$/,
        use: [
          // "style-loader",
          MiniCssExtractPlugin.loader,
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
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css', // 直接被页面引入
      chunkFilename: '[name].chunk.css',
    }),
    new WorkBoxWebpackPlugin.GenerateSW({
      clientsClaim: true, // 强制等待中的 Service Worker 被激活
      skipWaiting: true, // Service Worker 被激活后使其立即获得页面控制权
    }),
  ],
  optimization: {
    minimizer: [new OptimizeCssAssetsWebpackPlugin({})],
  },
  output: {
    // contenthash: 由content产生的一个hash字符串, content不变，hash值不变，
    // 能够使用缓存, hash值没有变, 就能够使用缓存, 不需要重新请求服务
    filename: "[name].[contenthash].js", // name 表示entry中的key, 打包多个文件可用
    chunkFilename: '[name].[contenthash].chunk.js',
  },
};

module.exports = ProdConfig;
