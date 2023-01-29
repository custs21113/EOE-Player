const path = require("path");
const { merge } = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { DefinePlugin } = require('webpack')
const common = require("./webpack.common.js");

module.exports = {
  mode: "development",
  entry: {
    preload: "./src/preload/preload.ts"
  },
  stats: "errors-only",
  devtool: 'source-map',
  target: 'electron-renderer',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist/renderer'),
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          configFile: path.resolve(process.cwd(), './src/main/tsconfig.json'),
        },
      },
    ]
  },
};