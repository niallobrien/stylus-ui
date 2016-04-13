// npm i gulp -g
// npm i --save-dev gulp-stylus gulp-sourcemaps gulp-autoprefixer gulp-cssnano gulp-plumber gulp-clean gulp-watch gulp-rename gulp-size gulp-notify gulp-exec
var gulp = require('gulp'),
  stylus = require('gulp-stylus'),
  sourcemaps = require('gulp-sourcemaps'),
  autoprefixer = require('gulp-autoprefixer'),
  cssnano = require('gulp-cssnano'),
  plumber = require('gulp-plumber'),
  clean = require('gulp-clean'),
  watch = require('gulp-watch'),
  rename = require('gulp-rename'),
  size = require('gulp-size'),
  notify = require('gulp-notify'),
  exec = require('gulp-exec')

gulp.task('default', ['build', 'watch'])

gulp.task('build', ['clean', 'styles'])

gulp.task('clean', function () {
  return gulp.src('public/styles/**.*', {read: false})
    .pipe(clean())
})

gulp.task('watch', function () {
  gulp.watch('assets/styles/**/*.styl', ['build'])
})

gulp.task('styles', function () {
  gulp.src('assets/styles/stylus-ui.styl')
    .pipe(plumber())
    .pipe(stylus({paths: ['node_modules']}))
    .pipe(autoprefixer('last 1 version'))
    .pipe(rename('main.css'))
    .pipe(gulp.dest('./public/styles/'))
    .pipe(cssnano())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./public/styles/'))
    .pipe(size())
    .pipe(notify('Stylus compilation complete.'))
})
