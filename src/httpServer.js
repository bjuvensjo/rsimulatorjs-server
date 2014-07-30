var http = require('http');
var httpProxy = require('http-proxy');
var httpSimulator = require('rsimulatorjs-http');
var log = require('rsimulatorjs-log');


module.exports = (function () {

    var logger = log.getLogger('rsimulatorjs-http.httpServer');
    

    // Example options:
    // {
    //     simulatorConfig: {
    //         port: 9000,
    //         rootPath: '../test/testFiles',
    //         useRootRelativePath: true
    //     },
    //     proxyConfig: {
    //         middleware: [
    //             function (req, res, next) {
    //                 res.setHeader('ErrorCode', 100);
    //                 next();
    //             },
    //             function (req, res, next) {
    //                 next();
    //                 res.setHeader('ErrorMessage', 'errorMessage');
    //             }
    //         ],
    //         port: 8000,
    //         options: {
    //             pathnameOnly: true,
    //             router: {
    //                 '/service': '127.0.0.1:9000',
    //                 '': '127.0.0.1:9001'
    //             }
    //         }
    //     },
    //     logLevel: 'debug' (default) | 'info' | 'error'
    // };
    return function (options) {
        var proxyArguments;

        log.setGlobalLogLevel(options.logLevel || 'debug');

        // Create a http server, i.e. the one running the httpSimulator
        http.createServer((function () {

            // Create the httpSimulator
            var theHttpSimulator = httpSimulator.create({
                rootPath: options.simulatorConfig.rootPath,
                useRootRelativePath: options.simulatorConfig.useRootRelativePath || true
            });

            return function (request, response) {
                theHttpSimulator.handle(request, response);
            };
        }())).listen(options.simulatorConfig.port);


        // If configured, create a proxy server
        if (options.proxyConfig) {
            proxyArguments = options.proxyConfig.middleware || [];
            proxyArguments.push(options.proxyConfig.options);

            httpProxy.createServer.apply(undefined, proxyArguments).listen(options.proxyConfig.port);
        };
        
    };

}());

