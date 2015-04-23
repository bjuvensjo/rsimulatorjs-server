# rsimulatorjs-server #

## Usage ##

The "server" gulp task examplifies how to use this module

    var rsimulatorjsServer = require('./src/module.js');

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


## Test ##

1. In one Terminal: gulp 
2. In another Terminal: gulp test-single



