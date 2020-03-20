// initials
const autoprefixer = require('autoprefixer'),
      cssnano = require('gulp-cssnano'),
      { src, dest, parallel, series, watch } = require('gulp'),
      concat = require('gulp-concat'),
      postcss = require('gulp-postcss'),
      rename = require('gulp-rename'),
      sass = require('gulp-sass'),
      uglify = require('gulp-uglify'),
      babel = require('gulp-babel'),
      plumber = require('gulp-plumber');

      
// file path
const files = {
    scssPath: 'scss/**/*.scss',
    jsPath: 'js/**/*.js'
}

// sass
function scssTask() {
    return src(files.scssPath)
           .pipe(sass())
           .pipe(dest('dist/css'))
           .pipe(cssnano())
           .pipe(rename({
                suffix: '.min'
            }))
           .pipe(dest('dist/css'))
}

// js
function jsTask() {
    return src(files.jsPath)
           .pipe(concat('main.js'))
           .pipe(plumber())
           .pipe(babel({
                presets: [
                    ['@babel/env', {
                        modules: false
                    }]
                ]
            }))
           .pipe(dest('dist/js'))
           .pipe(uglify())
           .pipe(rename({
                suffix: '.min'
            }))
           .pipe(dest('dist/js'))
}


// watch
function watchTask() {
    watch([files.scssPath, files.jsPath],
        parallel(scssTask, jsTask));
}

// default
exports.default = series(
    parallel(scssTask, jsTask),
    watchTask
)