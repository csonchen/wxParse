const gulp = require('gulp');
const path = require('path');
const jsmin = require('gulp-uglify-es').default;
const cssmin = require('gulp-clean-css')
const del = require('del');
const event = require('event-stream');

const srcPath = path.resolve(__dirname + '/components');
const distPath = path.resolve(__dirname + '/dist');

gulp.task('clean', () => {
  return del(distPath)
})

gulp.task('jsmin', () => {
  return gulp.src(srcPath + '/**/*.js')
    .pipe(jsmin())
    .pipe(gulp.dest(distPath))
})

gulp.task('cssmin', () => {
  return gulp.src(srcPath + '/**/*.wxss')
    .pipe(cssmin())
    .pipe(gulp.dest(distPath))
})

gulp.task('copy', (done) => {
  event.merge(
    gulp.src(srcPath + '/**/*.wxml').pipe(gulp.dest(distPath)),
    gulp.src(srcPath + '/**/*.json').pipe(gulp.dest(distPath)),
    gulp.src(srcPath + '/**/*.{png,gif,jpg}').pipe(gulp.dest(distPath))
  )
  done()
})

gulp.task('build', gulp.series(
  'clean',
  gulp.parallel('jsmin', 'cssmin', 'copy'),
))