const path = require('path');
const baseConfig = require('./webpack.common.js');
const webpackMerge = require('webpack-merge');
const { EnvironmentPlugin } = require('webpack');

const mainConfig = {
  entry: path.resolve(__dirname, '../main.js'),
  target: 'electron-main',
  output: {
    filename: 'electron.js',
    path: path.resolve(__dirname, '../dist'),
  },
  devtool: 'source-map',
  mode: 'development',
  plugins: [
    new EnvironmentPlugin({
      NODE_ENV: 'development'
    })
  ],
};

module.exports = webpackMerge.merge(baseConfig, mainConfig);