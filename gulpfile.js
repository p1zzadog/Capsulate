var gulp = require('gulp');
var concat = require('gulp-concat');
var makeItUgly = require('gulp-uglify');
var min = require('gulp-minify-css');


gulp.task('default', function(){
	console.log('*gulp*');
});

gulp.task('build-js', function(){
	gulp.src(['./public/js/source/ngConfig.js', './public/js/source/**/*.js'])
		.pipe(concat('buildjs.js'))
		.pipe(makeItUgly())
		.pipe(gulp.dest('./public/js/build/'));
});

gulp.task('build-css', function(){
	gulp.src('./public/css/source/**/*.css')
	.pipe(concat('buildcss.css'))
	.pipe(min())
	.pipe(gulp.dest('./public/css/build/'));
});

gulp.task('ticktock', function(){
	gulp.watch('./js/**/*.js', ['build-js']);
	gulp.watch('./css/**/*.css', ['build-css']);
});
