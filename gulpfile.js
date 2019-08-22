const {src, dest, watch} = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const gulpStylelint = require('gulp-stylelint');

function style() {
  return src("./scss/**/*.scss")
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('./css'))
    .pipe(browserSync.stream());
}

function lintCss() {
  return src("./scss/**/*.scss")
    .pipe(gulpStylelint({
      reporters: [
        {
          formatter: 'string',
          console: true
        }
      ]
    }));
}

function watcher() {
  browserSync.init({
    server: {
      baseDir: './'
    }
  })
  watch("./scss/**/*.scss", style);
  watch("./*.html").on('change', browserSync.reload);
}

exports.style = style;
exports.lintCss = lintCss;
exports.watcher = watcher;
