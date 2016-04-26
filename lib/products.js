"use strict";

var querystring = require("querystring");
var SdkException = require("./sdkexception.js");
var WebHelper = require("./webhelper.js");
var GettyApiRequest = require("./baseclasses/gettyApiRequest.js");

class Products extends GettyApiRequest {
    constructor(credentials, hostName) { 
        super(credentials, hostName);

    }
    
    execute(next) {
        var path = "/v3/products";

        var webHelper = new WebHelper(this.credentials, this.hostName);
        webHelper.get(path, function (err, response) {
            if (err) {
                next(err, null);
            } else {
                if (response.code === 404) {
                    throw new SdkException("Products were not found");
                }
                next(null, response);
            }
        });
    }
}

module.exports = Products;