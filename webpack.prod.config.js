'use strict'
var webpack = require('webpack')
var path = require('path')
var loaders = require('./webpack.loaders')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CompressionPlugin = require('compression-webpack-plugin')

module.exports = env => {
    return {
        entry: ['./src/index.js'],
        devtool: 'source-map',
        output: {
            publicPath: '/dist/',
            path: path.resolve('./dist/'),
            filename: '[hash].app_bundle.js',
            sourceMapFilename: '[hash].app.map'
        },
        resolve: {
            extensions: ['.js', '.jsx', '.coffee']
        },
        module: {
            rules: loaders
        },
        plugins: [
            new ExtractTextPlugin({
                filename: '[hash].styles.css'
            }),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('production'),
                __DEV__: false,
                __CURRENT_APP__: JSON.stringify('USER_APP')
            }),
            new webpack.optimize.AggressiveMergingPlugin(),
            new HtmlWebpackPlugin({
                template: './public/index.html',
                title: 'Evys',
                filename: 'index_student.html',
                description: 'Обучающая платформа Evys.',
                files: {
                    css: ['[hash].styles.css'],
                    js: ['[hash].app_bundle_dev.js']
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
