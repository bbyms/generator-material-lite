var gulp = require("gulp"),
    sass = require('gulp-sass'),
    watch = require("gulp-watch"),
    watchify = require("watchify"),
    path = require('path'),
    jade = require('gulp-jade'),    // Used to stream bundle for further handling
    gutil = require('gulp-util'),
    using = require('gulp-using'),
    browserSync = require('browser-sync').create();

gulp.task('serve', ['sass', 'templates'], function() {

    browserSync.init({
        server: "./dist"
    });

    gulp.watch('assets/sass/**/*.scss', ['sass']);
    gulp.watch('assets/jade/*.jade', ['templates']);
    gulp.watch('dist/css/*.css').on('change', browserSync.reload);
    gulp.watch('dist/*.html').on('change', browserSync.reload);
});

gulp.task('sass', function () {
   return gulp.src('assets/sass/**/*.scss')
      .pipe(sass())
      .pipe(gulp.dest('dist/css'))
      .pipe(browserSync.stream());

    gulp.src('UIComponents/UIComponents.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist-react/app/UIComponents'));
});

gulp.task('templates', function() {
    return gulp.src('assets/jade/*.jade')
     .pipe(jade({pretty: true}).on('error', gutil.log))
     .pipe(gulp.dest('dist'))
     .pipe(browserSync.stream());

    gulp.src('assets-react/jade/*.jade')
        .pipe(jade({pretty: true}).on('error', gutil.log))
        .pipe(gulp.dest('dist-react/'))
});

gulp.task('copyjs', function() {
   gulp.src('./bower_components/material-design-lite/material.min.js')
   .pipe(gulp.dest('dist/js'));
});


gulp.task('watch', function() {
    var jadeFiles = ['assets/jade/*.jade', 'assets-react/jade/*.jade'];
    var scssFiles = ['assets/sass/**/*.scss', 'UIComponents/**/*.scss'];
    gulp.watch(jadeFiles , ['templates']);
    gulp.watch(scssFiles , ['sass']);
});



gulp.task('all', ['default'], function() {
  // Do stuff
});

gulp.task('default', ['serve']);
