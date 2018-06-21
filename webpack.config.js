"use strict";
var webpack = require("webpack");
var path = require("path");
var loaders = require("./webpack.loaders");
var DashboardPlugin = require("webpack-dashboard/plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");

const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || "3000";

loaders.push({
  test: /\.scss$/,
  loaders: ["style-loader", "css-loader?importLoaders=1", "sass-loader"],
  exclude: ["node_modules"]
});

module.exports = env =>
{
  return {
    entry: [
      "react-hot-loader/patch",
      "./src/index.js",
    ],
    devtool: process.env.WEBPACK_DEVTOOL || "eval-source-map",
    output: {
      publicPath : env.DEV_SERVER ? 'http://localhost:3000/' : 'http://dev-evys.ru:8000/static/dist/',
      path: path.resolve('./dist'),
      filename: "app_bundle_dev.js"
    },
    resolve: {
      extensions: [".js", ".jsx"]
    },
    module: {
      loaders
    },
    devServer: {
      contentBase: './public',
      // enable HMR
      hot: true,
      // embed the webpack-dev-server runtime into the bundle
      inline: true,
      // serve index.html in place of 404 responses to allow HTML5 history
      historyApiFallback: true,
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
        filename: "style.css",
        allChunks: true
      }),
      new DashboardPlugin(),
      new HtmlWebpackPlugin({
        template: "./public/index.html",
        files: {
          css: ["style.css"],
          js: [ "app_bundle_dev.js"],
        }
      }),
    ]
  };
};
