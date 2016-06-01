"use strict";

var querystring = require("querystring");
var SdkException = require("./sdkexception.js");
var WebHelper = require("./webhelper.js");
var GettyApiRequest = require("./baseclasses/gettyApiRequest.js");

const _ids = new WeakMap();
const _fields = new WeakMap();

class Events extends GettyApiRequest {
    constructor(credentials, hostName) {
        super(credentials,hostName);
        this.page = 0;
        this.pageSize = 0;
    }
    withPage(page) {
        this.page = page;
        return this;
    }
    withPageSize(pageSize) {
        this.pageSize = pageSize;
        return this;
    }
    
    execute(next) {

        var path = "/v3/sets";

        var params = {};
        if (this.page > 0) {
            params.page = this.page;
        }
        if (this.pageSize > 0) {
            params.page_size = this.pageSize;
        }

        path += "?";
        path += querystring.stringify(params);

        var webHelper = new WebHelper(this.credentials, this.hostName);
        webHelper.get(path, function (err, response) {
            if (err) {
                next(err, null);
            } else {
                next(null, response);
            }
        });        
    }
}

module.exports = Events;