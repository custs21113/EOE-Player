const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "production",
  stats: "errors-only",
  output: {
    publicPath: '/',
  },
  target: 'web',
  // plugins: [
  //   new DefinePlugin({
  //     NODE_ENV: process.env.NODE_ENV,
  //   })
  // ]
})