var expect = require("expect.js");
var request = require('sync-request');

describe("module", function () {

    it("should work", function () {
        var requestBody = '{"foo":"fox","bar":"bar"}';

        var options = {
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: requestBody
        };

        var response = request('POST', 'http://localhost:8000/service/account', options);

        expect(response.statusCode).to.be(200);

        expect(response.getBody('utf-8')).to.be(requestBody);
        expect(response.headers.errorcode).to.be('100');
        expect(response.headers.errormessage).to.be('errorMessage');

    });

});
