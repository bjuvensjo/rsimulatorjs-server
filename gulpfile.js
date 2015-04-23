var gulp = require('gulp');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var rsimulatorjsServer = require('./src/module.js');
var stylish = require('jshint-stylish');

gulp.task('jshint', function() {
    // return gulp.src(['src/**/*', 'test/**/*js', 'test/**/*json'])
    return gulp.src(['src/**/*', 'test/**/*js'])
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});

gulp.task('server', function() {
    var options = {
        simulatorConfig: {
            port: 9000,
            rootPath: './test/testFiles',
            useRootRelativePath: true
        },
        proxyConfig: {
            middleware: [
                function (req, res, next) {
                    res.setHeader('ErrorCode', 100);
                    next();
                },
                function (req, res, next) {
                    next();
                    res.setHeader('ErrorMessage', 'errorMessage');
                }
            ],
            port: 8000,
            options: {
                pathnameOnly: true,
                router: {
                    '/service': '127.0.0.1:9000',
                    '': '127.0.0.1:9001'
                }
            }
        },
        logLevel: 'debug'
    };

    rsimulatorjsServer(options);
});

gulp.task('test-single', function () {
    return gulp.src('test/**/*-test.js', {read: false})
        .pipe(mocha({reporter: 'spec'}));
});

gulp.task('default', ['jshint', 'server'], function() {

});
