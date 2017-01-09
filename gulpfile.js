/**
 * Created by tan.bui on 9.1.2017.
 */

var gulp = require('gulp');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var browserSync = require('browser-sync').create();

gulp.task('default', ['browser-sync'], function () {
    gulp.watch('./assets/js/**/*.js', ['script']);
    gulp.watch('./assets/scss/**/*.{sass,scss}', ['scss']);
});

gulp.task('browser-sync', ['scss', 'script'], function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('scss', function () {
    gulp.src('./assets/scss/main.scss')
        .pipe(sass())
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.reload({stream: true}));
});

/* Compile multiple js file into one can cause error. */
gulp.task('script', function () {
    gulp.src('./assets/js/**/*.js')
        .pipe(gulp.dest('./js'))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(browserSync.reload({stream: true}));
});