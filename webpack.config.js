'use strict'
var webpack = require('webpack')
var path = require('path')
var loaders = require('./webpack.loaders')
var MiniCssExtractPlugin = require('mini-css-extract-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ManifestPlugin = require('webpack-manifest-plugin')

const HOST = process.env.HOST || '127.0.0.1'
const PORT = process.env.PORT || '3000'

module.exports = env => {
    return {
        entry: ['react-hot-loader/patch', './src/index.js'],
        mode: 'development',
        devtool: process.env.WEBPACK_DEVTOOL || 'eval-source-map',
        output: {
            publicPath: '/',
            path: path.resolve('./dist'),
            filename: 'app_bundle_dev.js'
        },
        resolve: {
            extensions: ['.js', '.jsx', '.coffee']
        },
        module: {
            rules: loaders
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
                index: '/index_student.html'
            },
            compress: true,
            port: PORT,
            host: HOST,
            proxy: {
                '/frontend': {
                    target: 'http://localhost:3000',
                    pathRewrite: { '^/frontend': '' }
                }
            }
        },
        plugins: [
            new webpack.DefinePlugin({
                __DEV__: env.DEV,
                __CURRENT_APP__: JSON.stringify('USER_APP')
            }),
            new webpack.NoEmitOnErrorsPlugin(),
            new webpack.NamedModulesPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            new MiniCssExtractPlugin({
                filename: '[name].css',
                chunkFilename: '[id].css'
            }),
            new HtmlWebpackPlugin({
                template: './public/index.html',
                title: 'Evys.Школа',
                filename: 'index_student.html',
                description: 'Образовательная платформа Evys',
                keywords: 'Evys.ru платформа объединяющая тех, кто учит и тех, кто хочет учить'
            }),
            new ManifestPlugin()
        ]
    }
}
