'use strict';

var _ = require('lodash'),
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    browserSync = require('browser-sync'),
    webpack = require('webpack'),
    webpackConfig = require('./webpack.config.js');

var banner = _.template([
  '',
  ' React Simpletabs - <%= pkg.description %>',
  ' @version v<%= pkg.version %>',
  ' @link <%= pkg.homepage %>',
  ' @license <%= pkg.license %>',
  ' @author <%= pkg.author.name %> (<%= pkg.author.url %>)',
  ''
].join('\n'), {
  pkg: require('./package.json')
});

gulp.task('webpack', function(callback) {
  var jsFilename = webpackConfig.output.filename;
  var cssFilename = webpackConfig.plugins[1].filename;

  webpackConfig.plugins = webpackConfig.plugins.concat(
    new webpack.BannerPlugin(banner, { entryOnly: true })
  );

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
    browserSync.reload();
    callback();
  });
});

gulp.task('server', function() {
  browserSync({
    server: {
      baseDir: ['example', 'dist']
    }
  });
});

gulp.task('watch', function() {
  gulp.watch('./lib/**/*.{styl,jsx}', ['webpack']);
});

gulp.task('default', ['webpack', 'server', 'watch']);
