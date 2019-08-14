'use strict'
var webpack = require('webpack')
var path = require('path')
var loaders = require('./webpack.loaders')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
const CircularDependencyPlugin = require('circular-dependency-plugin')

const HOST = process.env.HOST || '127.0.0.1'
const PORT = process.env.PORT || '3000'

module.exports = env => {
    return {
        mode: 'development',
        entry: ['react-hot-loader/patch', './src/admin_index.js'],
        devtool: process.env.WEBPACK_DEVTOOL || 'eval-source-map',
        output: {
            publicPath: '/',
            path: path.resolve('./dist'),
            filename: 'admin_bundle_dev.js',
            chunkFilename: '[contenthash].admin_bundle_dev.js'
        },
        resolve: {
            extensions: ['.js', '.jsx', '.coffee']
        },
        module: {
            rules: loaders
        },
        devServer: {
            contentBase: './public',
            index: '/index_admin.html',
            // enable HMR
            hot: true,
            // embed the webpack-dev-server runtime into the bundle
            inline: true,
            // serve index.html in place of 404 responses to allow HTML5 history
            historyApiFallback: {
                index: '/index_admin.html'
            },
            proxy: {
                '/frontend': {
                    target: 'http://localhost:3000',
                    pathRewrite: { '^/frontend': '/' }
                }
            },
            compress: true,
            port: PORT,
            host: HOST
        },
        optimization: {
            splitChunks: {
                chunks: 'all',
                minChunks: 2
            }
        },
        plugins: [
            new webpack.ProvidePlugin({
                'window.Quill': 'quill/dist/quill.js',
                Quill: 'quill/dist/quill.js'
            }),
            new webpack.DefinePlugin({
                __DEV__: env.DEV,
                __CURRENT_APP__: JSON.stringify('ADMIN_APP')
            }),
            new webpack.NoEmitOnErrorsPlugin(),
            new webpack.NamedModulesPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            new ExtractTextPlugin({
                filename: 'styles_admin.css'
            }),
            new HtmlWebpackPlugin({
                template: './public/index_admin.html',
                title: 'Evys.Курсы',
                filename: 'index_admin.html',
                description: 'Создадим онлайн школу вместе с Evys.',
                keywords: 'Evys.ru платформа объединяющая тех, кто учит и тех, кто хочет учить'
            })
            // new CircularDependencyPlugin({
            //     // exclude detection of files based on a RegExp
            //     exclude: /a\.js|node_modules/,
            //     // add errors to webpack instead of warnings
            //     failOnError: true,
            //     // set the current working directory for displaying module paths
            //     cwd: process.cwd(),
            // })
        ]
    }
}
