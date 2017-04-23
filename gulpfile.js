"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gulp = require("gulp");
const sass = require("gulp-sass");
const pug = require("gulp-pug");
const ts = require("gulp-typescript");
const reload = require("gulp-livereload");
const pleeease = require("gulp-pleeease");
const changed = require("gulp-changed");
const ots = require("typescript");
const fs = require("fs");
let skills = fsJSONPromise('src/info.json');
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
function watch(isTest) {
    let htmlTag = (isTest ? 'testhtml' : 'html');
    listen();
    gulp.watch('src/info.json', () => {
        skills = fsJSONPromise('src/info.json');
        gulp.start([htmlTag]);
    });
    gulp.watch('src/pug/*.pug', [htmlTag]);
    gulp.watch('src/scss/*.scss', ['css']);
    gulp.watch('src/ts/*.ts', ['js']);
}
gulp.task('html', () => {
    skills.then(s => {
        if (!('locals' in pugParams))
            pugParams.locals = {};
        pugParams.locals.skills = s;
        html(pugParams);
    }).catch(a => {
        console.error(a);
        process.exit(1);
    });
});
gulp.task('testhtml', () => {
    skills.then(s => {
        if (!('locals' in pugTestParams))
            pugTestParams.locals = {};
        pugTestParams.locals.skills = s;
        html(pugTestParams);
    }).catch(a => {
        console.error(a);
        process.exit(1);
    });
});
gulp.task('css', css);
gulp.task('js', js);
gulp.task('watch', ['js', 'css', 'html'], () => watch(false));
gulp.task('testWatch', ['testComp']);
gulp.task('default', ['js', 'css', 'html']);
gulp.task('testComp', ['js', 'css', 'testhtml'], () => watch(true));
function fsJSONPromise(file) {
    return new Promise((res, rej) => {
        fs.readFile(file, 'utf8', (err, data) => {
            if (err) {
                rej(err);
            }
            else {
                res(JSON.parse(data));
            }
        });
    });
}
