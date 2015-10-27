var gulp = require('gulp');
var concat = require('gulp-concat');
var makeItUgly = require('gulp-uglify');
var min = require('gulp-minify-css');


gulp.task('default', function(){
	console.log('*gulp*');
});

gulp.task('build-js', function(){
	gulp.src('./public/js/**/*.js')
		.pipe(concat('alljs.js'))
		.pipe(makeItUgly())
		.pipe(gulp.dest('./public/dest/js'));
});

gulp.task('build-css', function(){
	gulp.src('./public/css/**/*.css')
	.pipe(concat('allcss.css'))
	.pipe(min())
	.pipe(gulp.dest('./public/dest/css'));
});

gulp.task('ticktock', function(){
	gulp.watch('./js/**/*.js', ['build-js']);
	gulp.watch('./css/**/*.css', ['build-css']);
});