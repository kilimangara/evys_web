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
      "./src/admin_index.js",
    ],
    output: {
      publicPath : '/dist/',
      path: path.resolve('./dist/'),
      filename: "[hash].admin_app_bundle.js"
    },
    resolve: {
      eextensions: [".js", ".jsx", ".coffee"]
    },
    module: {
      loaders
    },
    plugins: [
      new ExtractTextPlugin({
        filename: "[hash].styles_admin.css"
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production'),
        __DEV__: false,
        __CURRENT_APP__: JSON.stringify('ADMIN_APP')
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
        template: "./public/index_admin.html",
        title: 'Evys admin',
        filename: 'index_admin.html',
        description: 'Создадим онлайн школу вместе с Evys.',
        files: {
          css: ["[hash].styles_admin.css"],
          js: [ "[hash].admin_app_bundle.js"],
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
