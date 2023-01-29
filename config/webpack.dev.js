const path = require("path");
const { merge } = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { EnvironmentPlugin } = require('webpack');
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  stats: "errors-only",
  devtool: "source-map",
  devServer: {
    static: {
      directory: path.resolve(__dirname, "../dist/renderer")
    },
    hot: true,
    open: true,
    port: 3001,
    historyApiFallback: true,
  },
  plugins: [
    new EnvironmentPlugin({
      NODE_ENV: 'development'
    }),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"),
      filename: "index.html",
      title: "eoe-player"
    })
  ]
})