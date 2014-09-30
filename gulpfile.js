/* jshint -W117 */
'use strict';

var gulp = require('gulp'),
		gutil = require('gulp-util'),
		source = require('vinyl-source-stream'),
		browserify = require('browserify'),
		webserver = require('gulp-webserver'),
		reactify = require('reactify'),
		stylus = require('gulp-stylus'),
		nib = require('nib');

var app = {
	path: {
		root: './src',
		styles: './src/css',
		scripts: './src/js'
	}
};

gulp.task('server', function() {
	gulp
		.src('./dist')
		.pipe(webserver({
			port: 3001,
			livereload: true
		}));
});

gulp.task('html', function() {
	gulp
		.src(app.path.root + '/*.html')
		.pipe(gulp.dest('./dist'));
});

gulp.task('css', function() {
	gulp
		.src(app.path.styles + '/*.styl')
		.pipe(stylus({
			use: [nib],
			errors: true
		}))
		.on('error', gutil.log)
		.pipe(gulp.dest('./dist/css'));
});

gulp.task('scripts', function() {
	browserify({
		insertGlobals: true,
		entries: [app.path.scripts + '/main.jsx'],
		transform: ['reactify'],
		extensions: ['.jsx']
	})
	.bundle()
	.on('error', gutil.log)
	.pipe(source('bundle.js'))
	.pipe(gulp.dest('./dist/js'));
});

gulp.task('watch', function() {
	gulp.watch(app.path.root + '/*.html', ['html']);
	gulp.watch(app.path.styles + '/*.styl', ['css']);
	gulp.watch(app.path.scripts + '/**/*.jsx', ['scripts']);
});

gulp.task('build', ['html', 'scripts', 'css']);
gulp.task('default', ['build', 'server', 'watch']);
