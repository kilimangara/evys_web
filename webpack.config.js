"use strict";
var webpack = require("webpack");
var path = require("path");
var loaders = require("./webpack.loaders");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");

const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || "3000";

module.exports = env =>
{
  return {
    entry: [
      "react-hot-loader/patch",
      "./src/index.js",
    ],
    devtool: process.env.WEBPACK_DEVTOOL || "eval-source-map",
    output: {
      publicPath :'/',
      path: path.resolve('./dist'),
      filename: "app_bundle_dev.js"
    },
    resolve: {
      extensions: [".js", ".jsx", ".coffee"]
    },
    module: {
      loaders
    },
    devServer: {
      contentBase: './public',
      index: '/index_student.html',
      // enable HMR
      hot: true,
      // embed the webpack-dev-server runtime into the bundle
      inline: true,
      // serve index.html in place of 404 responses to allow HTML5 history
      historyApiFallback: {
        index: '/index_student.html',
      },
      compress: true,
      port: PORT,
      host: HOST
    },
    plugins: [
      new webpack.DefinePlugin({
        __DEV__: env.DEV
      }),
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new ExtractTextPlugin({
        filename: "styles.css",
      }),
      new HtmlWebpackPlugin({
        template: "./public/index.html",
        title: 'Evys',
        filename: 'index_student.html',
        description: 'Обучающая платформа Evys.',
        files: {
          css: ["styles.css"],
          js: [ "app_bundle_dev.js"],
        }
      }),
    ]
  };
};
