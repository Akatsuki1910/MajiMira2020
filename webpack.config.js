const path = require('path');
const webpack = require('webpack');
// const fs = require('fs');

module.exports = {
  entry: `./src/index.js`,
  watch: true,
  cache: true,
  node: {
    fs: 'empty'
  },
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, 'dist')
  },
  mode: "development",
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 8080,
    open: true,
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env', {
              modules: false
            }]
          ]
        }
      }]
    }, {
      test: /\.json$/,
      loader: "json-loader",
      type: "javascript/auto"
    }]
  },
  plugins: [
    new webpack.ProvidePlugin({
      THREE: 'three',
      Ammo: 'ammo.js',
      _: "lodash",
      PIXI: 'pixi.js',
      jsonData: "./data.json",
      Stats: 'stats.js',
    }),
  ]
};