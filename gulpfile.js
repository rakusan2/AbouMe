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
const pugTestParams = Object.assign({}, pugParams, {
    locals: {
        autoReloadS: "document.write('<script src=\"http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1\"></' + 'script>')"
    }
});
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
;
let tsProject = ts.createProject(__dirname + '/tsconfig.json', tsOptions), isListening = false;
function html(params) {
    gulp.src('src/pug/*.pug')
        .pipe(changed('docs'))
        .pipe(pug(params))
        .on('error', onError)
        .pipe(gulp.dest('docs'))
        .pipe(reload());
}
function css() {
    gulp.src('src/scss/*.scss')
        .pipe(changed('docs/css'))
        .pipe(sass(sassOptions))
        .on('error', onError)
        .pipe(pleeease(pleeeaseOptions))
        .pipe(gulp.dest('docs/css'))
        .pipe(reload());
}
function js() {
    gulp.src(['src/ts/*.ts', 'typings/globals/**/*.ts', 'typings/modules/**/*.ts'])
        .pipe(tsProject())
        .on('error', onError).js
        .pipe(gulp.dest('docs/js'))
        .pipe(reload());
}
function listen() {
    if (isListening)
        return; // tslint:disable-line
    reload.listen(reloadOptions);
}
function watch() {
    listen();
    gulp.watch('src/pug/*.pug', ['html']);
    gulp.watch('src/scss/*.scss', ['css']);
    gulp.watch('src/ts/*.ts', ['js']);
}
function testWatch() {
    listen();
    gulp.watch('src/pug/*.pug', ['testhtml']);
    gulp.watch('src/scss/*.scss', ['css']);
    gulp.watch('src/ts/*.ts', ['js']);
}
gulp.task('html', () => {
    html(pugParams);
});
gulp.task('testhtml', () => {
    html(pugTestParams);
});
gulp.task('css', css);
gulp.task('js', js);
gulp.task('watch', ['js', 'css', 'html'], watch);
gulp.task('testWatch', testWatch);
gulp.task('default', ['js', 'css', 'html']);
gulp.task('testComp', ['js', 'css', 'testhtml', 'testWatch']);
