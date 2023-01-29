const dev = require('./webpack.preload.dev.js');
const { merge } = require("webpack-merge");

module.exports = merge(dev, {
  mode: "production",
})