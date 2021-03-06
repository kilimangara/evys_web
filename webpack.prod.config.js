'use strict'
var webpack = require('webpack')
var path = require('path')
var loaders = require('./webpack.loaders')
var MiniCssExtractPlugin = require('mini-css-extract-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CompressionPlugin = require('compression-webpack-plugin')

module.exports = env => {
    return {
        entry: ['./src/index.js'],
        output: {
            publicPath: '/dist/',
            path: path.resolve('./dist/'),
            filename: '[hash].app_bundle.js'
        },
        resolve: {
            extensions: ['.js', '.jsx', '.coffee']
        },
        module: {
            rules: loaders
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: '[name].[hash].css',
                chunkFilename: '[id].[name].[hash].css'
            }),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('production'),
                __DEV__: false,
                __CURRENT_APP__: JSON.stringify('USER_APP')
            }),
            new HtmlWebpackPlugin({
                template: './public/index.html',
                title: 'Evys.Школа - инновационный способ обучения',
                filename: 'index_student.html',
                description: 'Образовательная платформа нового поколения.',
                keywords: 'Evys.ru платформа объединяющая тех, кто учит и тех, кто хочет учить'
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
