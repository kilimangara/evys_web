'use strict'
var webpack = require('webpack')
var path = require('path')
var loaders = require('./webpack.loaders')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CompressionPlugin = require('compression-webpack-plugin')
var HtmlWebpackChangeAssetsExtensionPlugin = require('html-webpack-change-assets-extension-plugin')

module.exports = env => {
    return {
        entry: ['./src/admin_index.js'],
        output: {
            publicPath: '/dist/',
            path: path.resolve('./dist/'),
            filename: '[hash].admin_app_bundle.js'
        },
        resolve: {
            extensions: ['.js', '.jsx', '.coffee']
        },
        module: {
            rules: loaders
        },
        optimization: {
            splitChunks: {
                chunks: 'async',
                minSize: 30000,
                maxSize: 0,
                minChunks: 1,
                maxAsyncRequests: 5,
                maxInitialRequests: 3,
                automaticNameDelimiter: '~',
                name: true
            }
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
            new webpack.ProvidePlugin({
                'window.Quill': 'quill/dist/quill.js',
                Quill: 'quill/dist/quill.js'
            }),
            new HtmlWebpackPlugin({
                template: './public/index_admin.html',
                title: 'Evys.Курсы',
                filename: 'index_admin.html',
                description: 'Создадим онлайн школу вместе с Evys.'
            }),
            new CompressionPlugin({
                asset: '[path].gz[query]',
                algorithm: 'gzip',
                test: /\.js$/,
                threshold: 10240,
                minRatio: 0.8
            })
        ]
    }
}
