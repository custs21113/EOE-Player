const path = require('path');
const baseConfig = require('./webpack.common.js');
const webpackMerge = require('webpack-merge');
const { EnvironmentPlugin } = require('webpack')

const mainConfig = {
  mode: 'production',
  entry: path.resolve(__dirname, '../main.js'),
  target: 'electron-main',
  output: {
    filename: 'electron.js',
    path: path.resolve(__dirname, '../dist/main'),
  },
  devtool: 'source-map',
  plugins: [
    new EnvironmentPlugin({
      NODE_ENV: 'production'
    })
  ]
};

module.exports = webpackMerge.merge(baseConfig, mainConfig);