const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  entry: {
    vendors: ['react', 'react-dom', 'lodash'],
  },
  output: {
    filename: '[name].test.js',
    path: path.resolve(__dirname, '../test'),
    library: '[name]',
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]',
      path: path.resolve(__dirname, '../test/[name].manifest.json'),
    }),
  ],
};
