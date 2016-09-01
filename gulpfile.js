"use strict";
const gulp = require('gulp');
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const ts = require('gulp-typescript');
const reload = require('gulp-livereload');
const pleeease = require('gulp-pleeease');
const changed = require('gulp-changed');
const ots = require('typescript');
const pugParams = {
    doctype: 'html',
    pretty: true
};
const sassOptions = {
    outputStyle: 'expanded'
};
const pleeeaseOptions = {
    minifier: undefined
};
const tsOptions = {
    target: "es5",
    typescript: ots
};
const reloadOptions = {
    reloadPage: 'index.html'
};
function onError(err) {
    console.log(err.message);
}
let tsProject = ts.createProject(__dirname + '/tsconfig.json', tsOptions);
gulp.task('html', () => {
    gulp.src('src/pug/*.pug')
        .pipe(changed('pages'))
        .pipe(pug(pugParams))
        .on('error', onError)
        .pipe(gulp.dest('.'))
        .pipe(reload());
});
gulp.task('css', () => {
    gulp.src('src/scss/*.scss')
        .pipe(changed('pages/styles'))
        .pipe(sass(sassOptions))
        .on('error', onError)
        .pipe(pleeease(pleeeaseOptions))
        .pipe(gulp.dest('styles'))
        .pipe(reload());
});
gulp.task('js', () => {
    gulp.src(['src/ts/*.ts', 'typings/globals/**/*.ts', 'typings/modules/**/*.ts'])
        .pipe(ts(tsProject))
        .on('error', onError).js
        .pipe(gulp.dest('js'))
        .pipe(reload());
});
gulp.task('watch', () => {
    reload.listen(reloadOptions);
    gulp.watch('src/pug/*.pug', ['html']);
    gulp.watch('src/scss/*.scss', ['css']);
    gulp.watch('src/ts/*.ts', ['js']);
});
gulp.task('default', ['js', 'css', 'html', 'watch']);
