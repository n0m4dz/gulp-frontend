(function () {
    'use strict';
    var gulp = require('gulp'),
        gulp_dir = require('require-dir');

    GLOBAL.config = require('./gulp-files/config.json');
    gulp_dir('gulp-files');

    gulp.task('init', ['clean:dev', 'clean:dist'], function () {
        gulp.start('bower');
    });

    gulp.task('default', ['clean:dev'], function () {
        gulp.start('serve:dev');
    });

    gulp.task('dist', ['clean:dist'], function () {
        gulp.start('serve:dist');
    });

}).call(this);