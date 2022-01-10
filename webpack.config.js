const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    main: "./src/index.js",
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
  output: {
    publicPath: path.join(__dirname, "./dist/"),
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
};
