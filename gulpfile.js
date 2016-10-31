'use strict';

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    webpack = require('webpack'),
    webpackConfig = require('./webpack.config.js');

gulp.task('webpack', function(callback) {
  var jsFilename = webpackConfig.output.filename;
  var cssFilename = webpackConfig.plugins[1].filename;

  if (gutil.env.production) {
    webpackConfig.output.filename = gutil.replaceExtension(jsFilename, '.min.js');
    webpackConfig.plugins[1].filename = gutil.replaceExtension(cssFilename, '.min.css');
    webpackConfig.plugins = webpackConfig.plugins.concat(
      new webpack.DefinePlugin({
        'process.env': { 'NODE_ENV': JSON.stringify('production') }
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin()
    );
  }

  webpack(webpackConfig).run(function(err, stats) {
    if (err) {
      throw new gutil.PluginError('webpack', err);
    }

    gutil.log('[webpack]', stats.toString({ colors: true }));
    callback();
  });
});

gulp.task('default', ['webpack']);
