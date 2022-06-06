const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
console.log( path.resolve(__dirname, "../src/states"))
const { DefinePlugin } = require('webpack')
module.exports = {
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@': path.join(__dirname, '../', 'app/renderer'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
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
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new DefinePlugin({
      NODE_ENV: "production",
    })],
};