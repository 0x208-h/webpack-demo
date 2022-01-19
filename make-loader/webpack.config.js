const path = require('path');
module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.js',
  },
  resolveLoader: {
    modules: ['node_modules', './loaders']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        // use: [path.resolve(__dirname, './loaders/replaceloader.js')]
        use: [{
          // loader: path.resolve(__dirname, './loaders/replaceloader.js'),
          loader: 'replaceloader'
          // options: {
          //   name: 'HCH'
          // }
        }, {
          loader: path.resolve(__dirname, './loaders/replaceloaderasync.js'),
          options: {
            name: 'HCH'
          }
        }]
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  }
}