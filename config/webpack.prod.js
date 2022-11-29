const path = require("path");
const { merge } = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { EnvironmentPlugin } = require('webpack')
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "production",
  entry: {
    preload: "./preload.js"
  },
  stats: "errors-only",
  devtool: 'source-map',
  target: 'electron-renderer',
  plugins: [
    new EnvironmentPlugin({
      NODE_ENV: 'production',
      __static: './'
    }),
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"),
      filename: "index.html",
      title: "eoe-player"
    })
  ]
})