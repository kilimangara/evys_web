"use strict";
var webpack = require("webpack");
var path = require("path");
var loaders = require("./webpack.loaders");
var DashboardPlugin = require("webpack-dashboard/plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");

loaders.push({
  test: /\.scss$/,
  loaders: ["style-loader", "css-loader?importLoaders=1", "sass-loader"],
  exclude: ["node_modules"]
});

module.exports = env =>
{
  return {
    entry: [
      "./src/index.js",
    ],
    output: {
      publicPath : 'https://evys.ru/static/dist/',
      path: path.resolve('./dist/'),
      filename: "app_bundle.js"
    },
    resolve: {
      extensions: [".js", ".jsx"]
    },
    module: {
      loaders
    },
    plugins: [
      new webpack.DefinePlugin({
        __DEV__: false
      }),
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.NamedModulesPlugin(),
      new ExtractTextPlugin({
        filename: "style.css",
        allChunks: true
      }),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
      }}),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        comments: false,
        compress: {
            sequences     : true,
            booleans      : true,
            loops         : true,
            unused      : true,
            warnings    : false,
            drop_console: true,
            unsafe      : true
        }
      }),
      new HtmlWebpackPlugin({
        template: "./public/index.html",
        files: {
          css: ["style.css"],
          js: [ "app_bundle.js"],
        }
      }),
    ]
  };
};
