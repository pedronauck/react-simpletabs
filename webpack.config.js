'use strict';

var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var LIB_NAME = 'react-simpletabs';

module.exports = {
  entry: './lib/' + LIB_NAME + '.jsx',
  output: {
    path: __dirname + '/dist',
    filename: LIB_NAME + '.js',
    libraryTarget: 'umd',
    library: 'ReactSimpleTabs'
  },
  externals: {
    react: {
      root: 'React',
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react'
    }
  },
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      loader: 'jsx-loader?harmony'
    }, {
      test: /\.(js|jsx)$/,
      loader: 'jsx-loader?insertPragma=React.DOM'
    }, {
      test: /\.styl$/,
      loader: ExtractTextPlugin.extract(
        'style-loader',
        '!css-loader!stylus-loader'
      )
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.styl']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
      }
    }),
    new ExtractTextPlugin(LIB_NAME + '.css', {
      allChunks: true
    })
  ]
};
