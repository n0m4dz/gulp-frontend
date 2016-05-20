var gulp = require('gulp'),
    clean = require('gulp-clean'),
    gutil = require('gulp-util'),
    compass = require('gulp-compass'),
    plumber = require('gulp-plumber'),
    autoprefixer = require('gulp-autoprefixer'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    handleErrors = require('./handleErrors');


/** cleaning directory **/
gulp.task('clean:dev', function () {
    return gulp.src(config.path.app + "assets/css/*", {read: false})
        .pipe(clean());
});

/** Compass tasks **/
gulp.task('compass:dev', function () {
    return gulp.src(config.path.app + 'assets/scss/*.scss')
        .pipe(compass({
            config_file: config.path.root + 'config.rb',
            bundle_exec: true,
            sourcemap: true,
            css: config.path.app + 'assets/css',
            sass: config.path.app + 'assets/scss'
        }))
        .on('error', handleErrors)
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest(config.path.dist + 'assets/css'));
});

/** Script tasks **/
gulp.task('script:dev', function () {
    return gulp.src(config.path.app + 'assets/js/**/*.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter(stylish))       
});

gulp.task('build:dev', ['compass:dev', 'script:dev']);
