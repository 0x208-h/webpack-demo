const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  entry: {
    vendors: ['lodash'],
    react: ['react', 'react-dom'],
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
