var gulp = require('gulp');
var cssmin = require('gulp-cssmin');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat-util');
var rimraf = require('gulp-rimraf');

// =========================================================================
// Clean tasks
// =========================================================================
var clearFolder = function (src) {
    return gulp.src(src)
        .pipe(rimraf()).on('error', gutil.log);
};

gulp.task('clean-css-dist', function () {
    return clearFolder('./dist/css/*.*');
});
gulp.task('clean-js-dist', function () {
    return clearFolder('./dist/js/*.*');
});

// =========================================================================
// CSS task
// =========================================================================
gulp.task('min-css', function () {
    return gulp.src('./src/css/*.css')
        .pipe(concat('styles.css'))
        .pipe(sourcemaps.init())
        .pipe(cssmin({
            specialComments: 1,
            advanced: false
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/css/'))
        .on('error', gutil.log);
});

// =========================================================================
// JS task
// =========================================================================
gulp.task('min-js', function () {
    return gulp.src('./src/js/*.js')
        .pipe(concat('scripts.js'))
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/js/'))
        .on('error', gutil.log);
});

// =========================================================================
// Main tasks
// =========================================================================
gulp.task('build-css', ['clean-css-dist', 'min-css']);
gulp.task('build-js', ['clean-js-dist', 'min-js']);

// Gulp Default
gulp.task('default', ['build-css', 'build-js']);
