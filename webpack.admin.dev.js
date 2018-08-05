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
      "./src/admin_index.js",
    ],
    devtool: process.env.WEBPACK_DEVTOOL || "eval-source-map",
    output: {
      publicPath : env.DEV_SERVER ? 'http://localhost:3000/' : 'http://dev-evys.ru:3000/dist/',
      path: path.resolve('./dist'),
      filename: "admin_bundle_dev.js"
    },
    resolve: {
      extensions: [".js", ".jsx"]
    },
    module: {
      loaders
    },
    devServer: {
      contentBase: './public',
      proxy: {
        '/static': {
                    target: 'http://localhost:3000',
                    pathRewrite: {'^/static' : ''}
                   }
      },
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
        filename: "styles_admin.css",
      }),
      new HtmlWebpackPlugin({
        template: "./public/index.html",
        title: 'Evys admin',
        filename: 'index_admin.html',
        description: 'Создадим онлайн школу вместе с Evys.',
        files: {
          css: ["styles_admin.css"],
          js: [ "admin_bundle_dev.js"],
        }
      }),
    ]
  };
};
