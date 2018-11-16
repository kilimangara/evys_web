"use strict"
var ExtractTextPlugin = require("extract-text-webpack-plugin")

var babelLoader = {
  loader: 'babel-loader',
  options: {
    presets: ['react', 'es2015', 'stage-1'],
    plugins: ['transform-runtime']
  }
}

module.exports = [
  {
    test: /\.coffee$/,
    use: [ babelLoader, 'coffee-loader' ]
  },
  {
    test: /\.(jsx|js)?$/,
    exclude: /(node_modules|bower_components|public\/)/,
    use: [babelLoader]
  },
  {
    test: /\.css$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: 'css-loader'
    }),
    exclude: ['node_modules']
  },
  {
      test: /.(png|jpg|jpeg|gif|svg|woff|woff2|eot|ttf|svg)(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'file-loader',
      query: {
          name: '[hash].[ext]',
          limit: 10000,
      }
  },
  {
    test: /\.scss$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
        'css-loader',
        {
          loader: 'sass-loader'
        }
      ]
    }),
    exclude: ["node_modules"]
  }
];
