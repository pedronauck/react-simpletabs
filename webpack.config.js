'use strict';

var _ = require('lodash');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var LIB_NAME = 'react-simpletabs';

var banner = _.template([
  '',
  ' React Simpletabs - <%= pkg.description %>',
  ' @version v<%= pkg.version %>',
  ' @link <%= pkg.homepage %>',
  ' @license <%= pkg.license %>',
  ' @author <%= pkg.author.name %> (<%= pkg.author.url %>)',
  ''
].join('\n'))({
  pkg: require('./package.json')
});

module.exports = {
  entry: './lib/' + LIB_NAME + '.jsx',
  output: {
    path: __dirname + '/dist',
    filename: LIB_NAME + '.js',
    libraryTarget: 'umd',
    library: 'ReactSimpleTabs'
  },
  module: {
    loaders: [{
      test: /\.(js[x])$/,
      exclude: /node_modules/,
      loader: 'babel'
    }, {
      test: /\.css/,
      loader: ExtractTextPlugin.extract(
        'style-loader',
        '!css-loader'
      )
    }]
  },
  externals: {
    react: {
      root: 'React',
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react'
    }
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
      }
    }),
    new ExtractTextPlugin(LIB_NAME + '.css', {
      allChunks: true
    }),
    new webpack.BannerPlugin(banner, { entryOnly: true })
  ],
  devServer: {
    contentBase: './example',
    port: 3030,
    host: '0.0.0.0',
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    lazy: false,
    noInfo: true,
    colors: true
  }
};
