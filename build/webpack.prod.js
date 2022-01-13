const merge = require('webpack-merge');
const CommonConfig  = require('./webpack.common')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
// plugins 可以在webpack运行在某个时刻，做一些事情。

 const ProdConfig = {
  mode: "production",
  // 构建映射关系，将源代码和打包后的代码映射起来， source-map 能够产生.map文件，能够知道源代码哪里错了
  // inline-source-map， 会将.map文件打包后放在main.js中
  // cheap-inline-source-map 只知道哪一行出错，不知道哪一列出错， 只打包业务代码
  // eval
  //development 最佳 cheap-module-eval-source-map
  // production: cheap-module-source-map
  devtool: "cheap-module-source-map",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // "style-loader", 
          MiniCssExtractPlugin.loader,
          "css-loader"
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
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css', // 直接被页面引入
      chunkFilename: '[name].chunk.css'
    })
  ],
  optimization: {
    minimizer: [new OptimizeCssAssetsWebpackPlugin({})]
  }
};

module.exports = merge(CommonConfig, ProdConfig)
