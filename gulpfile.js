/* jshint -W117 */
'use strict';

var gulp = require('gulp'),
		umd = require('gulp-umd'),
		react = require('gulp-react'),
		uglify = require('gulp-uglify'),
		rename = require('gulp-rename');

var umdSettings = {
	exports: function(file) {
		return 'Tabs';
	},
	namespace: function(file) {
		return 'ReactSimpleTabs';
	},
	dependencies: function(file) {
		return [{
			name: 'React',
			amd: 'react',
			cjs: 'react',
			global: 'React',
			param: 'React'
		}];
	}
};

gulp.task('bundle', function() {
	gulp.src('./lib/react-simpletabs.jsx')
		.pipe(react())
		.pipe(umd(umdSettings))
		.pipe(gulp.dest('./dist'))
		.pipe(uglify())
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest('./dist'));
});

gulp.task('watch', function() {
	gulp.watch('./lib/react-simpletabs.jsx', ['bundle']);
});
