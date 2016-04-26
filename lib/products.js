"use strict";

var querystring = require("querystring");
var SdkException = require("./sdkexception.js");
var WebHelper = require("./webhelper.js");
var GettyApiRequest = require("./baseclasses/gettyApiRequest.js");

const _fields = new WeakMap();

class Products extends GettyApiRequest {
    constructor(credentials, hostName) { 
        super(credentials, hostName);

        this.fields = [];
    }
    
    set fields(value) {
        _fields.set(this,value);
    }
    
    get fields() {
        return _fields.get(this);
    }
    
    withResponseField(field) {
        this.fields[this.fields.length] = field;
        return this;
    }
    
    execute(next) {
        var path = "/v3/products";
        var params = null;

        if (this.fields.length > 0) {
            if (!params) {
                params = {};
            }

            params.fields = this.fields.join(",");
        }

        if (params) {
            path += "?" + querystring.stringify(params);
        }

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