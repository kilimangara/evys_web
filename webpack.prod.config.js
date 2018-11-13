"use strict";
var webpack = require("webpack");
var path = require("path");
var loaders = require("./webpack.loaders");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var CompressionPlugin = require('compression-webpack-plugin')

module.exports = env =>
{
  return {
    entry: [
      "./src/index.js",
    ],
    output: {
      publicPath : '/dist/',
      path: path.resolve('./dist/'),
      filename: "[hash].app_bundle.js"
    },
    resolve: {
      extensions: [".js", ".jsx", ".coffee"]
    },
    module: {
      loaders
    },
    plugins: [
      new ExtractTextPlugin({
        filename: "[hash].styles.css"
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production'),
        __DEV__: false
      }),
      new webpack.optimize.AggressiveMergingPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false,
            screw_ie8: true,
            conditionals: true,
            unused: true,
            comparisons: true,
            sequences: true,
            dead_code: true,
            evaluate: true,
            if_return: true,
            join_vars: true
        },
        output: {
            comments: false
        }
      }),
      new HtmlWebpackPlugin({
        template: "./public/index.html",
        title: 'Evys',
        filename: 'index_student.html',
        description: 'Обучающая платформа Evys.',
        files: {
          css: ["[hash].styles.css"],
          js: [ "[hash].app_bundle_dev.js"],
        }
      }),
      // new CompressionPlugin({
      //   asset: "[path].gz[query]",
      //   algorithm: "gzip",
      //   test: /\.js$|\.css$|\.html$/,
      //   threshold: 10240,
      //   minRatio: 0.8
      // })
    ]
  };
};
