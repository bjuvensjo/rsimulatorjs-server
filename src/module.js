var httpServer = require('./httpServer');


module.exports = (function () {

    // Example options:
    // {
    //     simulatorConfig: {
    //         port: 9000,
    //         rootPath: '../test/testFiles',
    //         useRootRelativePath: true
    //     },
    //     proxyConfig: {
    //         port: 8000,
    //         options: {
    //             pathnameOnly: true,
    //             router: {
    //                 '/service': '127.0.0.1:9000',
    //                 '': '127.0.0.1:9001'
    //             }
    //         }
    //     }
    // };
    return httpServer;

}());
