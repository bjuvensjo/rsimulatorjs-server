var http = require('http');
var assert = require('assert');


(function () {
    
    var requestBody = '{"foo":"fox","bar":"bar"}';

    var options = {
        hostname: 'localhost',
        port: 8000,
        path: '/service/account',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    var req = http.request(options, function(res) {
        assert.equal(res.statusCode, 200);

        res.setEncoding('UTF-8');
        res.on('data', function (chunk) {
            assert.equal(chunk, requestBody);
        });
    });

    // write data to request body
    req.write(requestBody + '\n');
    req.end();

}());
