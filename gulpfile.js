/*!
 * gulp file
 * Copyright 2020 MohammadReza Jelveh
 * Licensed under MIT (https://github.com/mrjelveh/BootsDrac/blob/master/LICENSE)
 */

// Initialing packages 

const autoprefixer = require('autoprefixer'),
      cleanCSS = require('gulp-clean-css'),
      { src, dest, parallel, series, watch } = require('gulp'),
      concat = require('gulp-concat'),
      postcss = require('gulp-postcss'),
      rename = require('gulp-rename'),
      sass = require('gulp-sass'),
      uglify = require('gulp-uglify'),
      babel = require('gulp-babel'),
      plumber = require('gulp-plumber');

      
// File path

const files = {
    scssPath: 'scss/**/*.scss',
    jsPath: 'js/**/*.js'
}


// SASS build & compiling

function scssTask() {
    return src(files.scssPath)
           .pipe(sass())
           .pipe(dest('dist/css')) // output without compression
           .pipe(cleanCSS())
           .pipe(rename({
                suffix: '.min'
            }))
           .pipe(dest('dist/css')) // output with compression
}


// JS Compiling

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
           .pipe(dest('dist/js')) // output without compression
           .pipe(uglify())
           .pipe(rename({
                suffix: '.min'
            }))
           .pipe(dest('dist/js')) // output with compression
}


// Watch live changes 👁

function watchTask() {
    watch([files.scssPath, files.jsPath],
        parallel(scssTask, jsTask));
}


// Default

exports.default = series(
    parallel(scssTask, jsTask),
    watchTask
)