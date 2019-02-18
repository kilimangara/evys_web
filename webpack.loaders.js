"use strict"
var ExtractTextPlugin = require("extract-text-webpack-plugin")

var babelLoader = {
  loader: 'babel-loader',
  options: {
    presets: [['@babel/preset-env', {targets: {ie : '10'}, forceAllTransforms: true}], '@babel/preset-react'],
    plugins: ['@babel/plugin-transform-runtime', ['@babel/plugin-proposal-decorators', {decoratorsBeforeExport: true}], '@babel/plugin-proposal-class-properties']
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
        test: /\.(scss|sass|css)$/i,
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
                { loader: 'css-loader', options: { minimize: true} },
                { loader: 'postcss-loader', options: { sourceMap: true, plugins: () => [require('autoprefixer')] }},
                'resolve-url-loader',
                { loader: 'sass-loader', options: { sourceMap: true } }
            ]
        })
    },
  {
      test: /.(png|jpg|jpeg|gif|svg|woff|woff2|eot|ttf|svg)(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'file-loader',
      query: {
          name: '[hash].[ext]',
          limit: 10000,
      }
  }
];
