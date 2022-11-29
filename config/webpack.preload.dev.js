const path = require("path");
const { merge } = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { DefinePlugin } = require('webpack')
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  entry: {
    preload: "./preload.js"
  },
  stats: "errors-only",
  devtool: 'source-map',
  target: 'electron-renderer',
})