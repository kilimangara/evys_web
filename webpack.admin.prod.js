'use strict'
var webpack = require('webpack')
var path = require('path')
var loaders = require('./webpack.loaders')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CompressionPlugin = require('compression-webpack-plugin')
var UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = env => {
    return {
        entry: ['./src/admin_index.js'],
        devtool: 'source-map',
        output: {
            publicPath: '/dist/',
            path: path.resolve('./dist/'),
            filename: '[hash].admin_app_bundle.js',
            sourceMapFilename: '[hash].admin_app.map'
        },
        resolve: {
            extensions: ['.js', '.jsx', '.coffee']
        },
        module: {
            rules: loaders
        },
        plugins: [
            new ExtractTextPlugin({
                filename: '[hash].styles_admin.css'
            }),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('production'),
                __DEV__: false,
                __CURRENT_APP__: JSON.stringify('ADMIN_APP')
            }),
            new webpack.optimize.AggressiveMergingPlugin(),
            new webpack.ProvidePlugin({
                'window.Quill': 'quill/dist/quill.js',
                Quill: 'quill/dist/quill.js'
            }),
            new HtmlWebpackPlugin({
                template: './public/index_admin.html',
                title: 'Evys admin',
                filename: 'index_admin.html',
                description: 'Создадим онлайн школу вместе с Evys.',
                files: {
                    css: ['[hash].styles_admin.css'],
                    js: ['[hash].admin_app_bundle.js']
                }
            })
            // new CompressionPlugin({
            //   asset: "[path].gz[query]",
            //   algorithm: "gzip",
            //   test: /\.js$|\.css$|\.html$/,
            //   threshold: 10240,
            //   minRatio: 0.8
            // })
        ]
    }
}
