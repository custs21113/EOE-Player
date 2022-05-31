const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  stats: "errors-only",
  devtool: "cheap-source-map",
  devServer: {
    static: {
      directory: path.resolve(__dirname, "../dist")
    }, 
    hot: true,
    open: true,
    port: 3001,
    historyApiFallback: true,
  }
})