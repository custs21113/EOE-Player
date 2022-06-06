const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { DefinePlugin } = require('webpack')
// const loader = require("ts-loader/dist");    

module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "bundle.[contenthash:16].js",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../src"),
      "~": path.resolve(__dirname, "../"),
    },
    extensions: [".ts", ".tsx", ".js", "jsx"],
    mainFiles: ["index.ts", "index.js", "index.tsx", "index.jsx"]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.(css|less)$/,
        // exclude: /node_modules/,
        use: [
          "style-loader",
          //  "css-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: '[local]'
              }
            }
          },
          "less-loader",
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"),
      filename: "index.html",
      title: "au-music"
    }),
    new DefinePlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    })
  ]
}