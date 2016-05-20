/**
 * Created by n0m4dz on 1/17/15.
 */
var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    flatten = require("gulp-flatten");

var bower_paths = {
    scripts: [
        config.path.bower_dir + 'angular/angular.js',
        config.path.bower_dir + 'angular-animate/angular-animate.js',
        config.path.bower_dir + 'angular-sanitize/angular-sanitize.js',
        config.path.bower_dir + 'angular-ui-router/release/angular-ui-router.js',
        config.path.bower_dir + 'angular-bootstrap/ui-bootstrap-tpls.js'
    ],
    styles: [
        config.path.bower_dir + 'bootstrap/dist/css/bootstrap.css',
        config.path.bower_dir + 'fontawesome/css/font-awesome.css',
        config.path.bower_dir + 'animate.css/animate.css'
    ],
    fonts: []
}


/*** scripts ***/
gulp.task('bower:scripts', function () {
    return gulp.src(bower_paths.scripts)
        .pipe(flatten())
        .pipe(gulp.dest(config.path.vendor_dir + 'js/'))
});

/*** Style ***/
gulp.task('bower:styles', function () {
    return gulp.src(bower_paths.styles)
        .pipe(flatten())
        .pipe(gulp.dest(config.path.vendor_dir + 'css/'))
});

/*** fonts ***/
gulp.task('bower:fonts', function () {
    return gulp.src(bower_paths.fonts)
        .pipe(flatten())
        .pipe(gulp.dest(config.path.vendor_dir + "fonts/"))
});

gulp.task('bower', ['bower:scripts', 'bower:styles', 'bower:fonts']);
