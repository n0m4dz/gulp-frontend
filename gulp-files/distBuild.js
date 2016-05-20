/**
 * Created by n0m4dz on 2015/1/26.
 */
var gulp = require('gulp'),
    clean = require('gulp-clean'),
    htmlMinify = require('gulp-minify-html'),
    compass = require('gulp-compass'),
    flatten = require('gulp-flatten'),
    gulpif = require('gulp-if'),
    autoprefixer = require('gulp-autoprefixer'),
    minifyCss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    ngAnnotate = require('gulp-ng-annotate'),
    sourcemaps = require('gulp-sourcemaps');


var file_paths = {
    html:[
        config.path.app + "**/*.html"
    ],
    js: [
        //vendor scripts
        config.path.vendor_dir + 'js/angular.js',
        config.path.vendor_dir + 'js/angular-sanitize.js',
        config.path.vendor_dir + 'js/angular-animate.js',
        config.path.vendor_dir + 'js/angular-ui-router.js',
        config.path.vendor_dir + 'js/ui-bootstrap-tpls.js',
        config.path.vendor_dir + 'js/icons-lte-ie7.js',
        //my scripts
        config.path.app + 'assets/js/*.js'
    ],
    css: [
        //vendor style
        config.path.vendor_dir + 'css/bootstrap.css',
        config.path.vendor_dir + 'css/animate.css',
        config.path.vendor_dir + 'css/simple-line-icons.css',
        //my style
        config.path.app + 'assets/css/*.css'
    ],
    fonts: [
        config.path.vendor_dir + 'fonts/**/*'
    ],
    images: [
        config.path.app + 'assets/images/**/*'
    ],
    static: [
        config.path.app + 'robots.txt'
    ]
}

/** cleaning directory **/
gulp.task('clean:dist', function () {
    return gulp.src(config.path.dist, {read: false})
        .pipe(clean());
});

/** HTML task **/
gulp.task('html:dist', function () {
    var opts = {empty: true, cdata:true, conditionals:true, comments: false, spare: true};
    gulp.src(file_paths.html)
        .pipe(htmlMinify(opts))
        .pipe(gulp.dest(config.path.dist))
});

/** Image task **/
gulp.task('image:dist', function() {
    return gulp.src(file_paths.images)
        .pipe(gulp.dest(config.path.dist + 'assets/images'));
});

/** css tasks **/
gulp.task('style:dist', function () {
    return gulp.src(file_paths.css)
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(concat('all.css'))
        .pipe(gulp.dest(config.path.dist + 'assets/css'))
        .pipe(minifyCss())
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write('.',{
            includeContent: false
        }))
        .pipe(gulp.dest(config.path.dist + 'assets/css'));
});

/** JS tasks **/
gulp.task('script:dist', function () {
    return gulp.src(file_paths.js)
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(concat('all.js'))
        .pipe(gulp.dest(config.path.dist + 'assets/js'))
        .pipe(gulpif(config.angular, ngAnnotate()))
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write('.',{
            includeContent: false
        }))
        .pipe(gulp.dest(config.path.dist + 'assets/js'))
});


/** Font tasks **/
gulp.task('font:dist', function () {
    return gulp.src(file_paths.fonts)
        .pipe(flatten())
        .pipe(gulp.dest(config.path.dist + "assets/fonts/"))
});

gulp.task('build:dist', ['html:dist', 'image:dist', 'style:dist', 'script:dist', 'font:dist']);




