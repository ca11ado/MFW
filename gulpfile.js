var gulp = require('gulp');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var minifyCSS = require('gulp-minify-css');
var react = require('gulp-react');

gulp.task('useref', function(){
	var assets = useref.assets();

	return gulp.src('dev/*.html')
		.pipe(assets)
		.pipe(gulpIf('*.css', minifyCSS())) // Uglifies CSS files
		.pipe(gulpIf('*.js', uglify()))	// Uglifies JS files
		.pipe(assets.restore())
		.pipe(useref())
		.pipe(gulp.dest(''))
});

gulp.task('react', function () {
    return gulp.src('dev/js/*.jsx')
        .pipe(react({harmony:true}))
        .pipe(gulp.dest('dev/js/'));
});
