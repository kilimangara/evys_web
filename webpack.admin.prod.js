'use strict'
var webpack = require('webpack')
var path = require('path')
var loaders = require('./webpack.loaders')
var MiniCssExtractPlugin = require('mini-css-extract-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CompressionPlugin = require('compression-webpack-plugin')
var ManifestPlugin = require('webpack-manifest-plugin')

module.exports = env => {
    return {
        mode: 'production',
        entry: ['./src/admin_index.js'],
        output: {
            publicPath: '/dist/',
            path: path.resolve('./dist/'),
            filename: '[hash].admin_bundle.js',
            chunkFilename: '[contenthash].[name].js'
            // Чанки ломают css
            // filename: '[name].chunkhash.bundle.js',
            // chunkFilename: '[name].chunkhash.bundle.js'
        },
        resolve: {
            extensions: ['.js', '.jsx', '.coffee']
        },
        module: {
            rules: loaders
        },
        optimization: {
            splitChunks: {
                cacheGroups: {
                    vendor1: {
                        test: /[\\/]node_modules[\\/](katex|codemirror)[\\/]/,
                        name: 'vendor1',
                        chunks: 'all'
                    }
                }
            }
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: '[name].[hash].css',
                chunkFilename: '[id].[name].[hash].css'
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
                title: 'Evys.Курсы - создание онлайн-школ бесплатно за 1 день',
                filename: 'index_admin.html',
                description:
                    'Платформа для онлайн-школ позволяет быстро создавать курсы, внести своих учеников и следить за ними в автоматизированном режиме.',
                keywords: 'Evys.ru платформа объединяющая тех, кто учит и тех, кто хочет учить'
            }),
            new CompressionPlugin({
                asset: '[path].gz[query]',
                algorithm: 'gzip',
                test: /\.js$/,
                threshold: 10240,
                minRatio: 0.8
            }),
            new ManifestPlugin()
        ]
    }
}
