var gulp = require('gulp');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var minifyCSS = require('gulp-minify-css');
var babel = require('gulp-babel');
var del = require('del');
var runSequence = require('run-sequence');
//var batch = require('gulp-batch');

//Наблюдает изменения *.jsx и запускает babel
gulp.task('watch', function () {
    gulp.watch('dev/js/*.jsx', function(){
        runSequence('babel');
    });
});

// запускает минификацию и конк-ию файлов, указанных в index.html и перенесоит в production
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

// транслирует jsx в javascript
gulp.task('babel', function(){
    return gulp.src('dev/js/*.jsx')
        .pipe(babel())
        .pipe(gulp.dest('dev/js/'));
});

// очистка файлов (пока не используется)
gulp.task('clean:prod', function (callback) {
    del(['js','css'],callback);
});

// дефолтная задача с очередью
gulp.task('default', function (callback) {
    runSequence('babel', 'watch');
});

// запустить в production
gulp.task('build', function () {
    runSequence('babel', 'useref');
});