var gulp = require('gulp'),
    notify = require('gulp-notify'),
    gutil = require('gulp-util'),
    connect = require('gulp-connect');


gulp.task('scss-watch-msg', function(){
    gutil.log(gutil.colors.cyan('Style changed'));
    return gulp.src("./logs/")
        .pipe(notify("Style changed"));
});

gulp.task('js-watch-msg', function(msg){
    gutil.log(gutil.colors.cyan('Script changed'));
    return gulp.src("./logs/")
        .pipe(notify("Script changed"));
});

gulp.task('watch', function() {
    // Watch .scss files
    gulp.watch(config.path.app + 'assets/scss/**/*.scss', ['compass:dev', 'scss-watch-msg']);
    // Watch .js files
    gulp.watch(config.path.app + 'assets/js/**/*.js', ['script:dev', 'js-watch-msg']);
});

/** Server task **/
gulp.task('serve:dev', ['build:dev', 'watch'], function () {
    connect.server({
        root: [config.server.dev.root],
        host: config.server.dev.host,
        port: config.server.dev.port,
        livereload: false
    });
});

/** Server tasks **/
gulp.task('serve:dist', ['build:dist'], function () {
    connect.server({
        root: [config.server.dist.root],
        host: config.server.dist.host,
        port: config.server.dist.port,
        livereload: false
    });
});

