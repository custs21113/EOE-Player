// build/webpack.main.prod.js
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { merge } = require('webpack-merge');

const mainConfig = require('./webpack.main.dev.js');

module.exports = merge(mainConfig, {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin(),
  ],
});
