"use strict";

var querystring = require("querystring");
var SdkException = require("./sdkexception.js");
var WebHelper = require("./webhelper.js");
var GettyApiRequest = require("./baseclasses/gettyApiRequest.js");

const _id = new WeakMap();
const _fields = new WeakMap();

class SimilarImages extends GettyApiRequest {
    constructor(credentials, hostName) { 
        super(credentials, hostName);
          
        this.id = null;
        this.fields = [];
        this.page = 0;
        this.pageSize = 0;
    }
    
    set id(value) {
        _id.set(this,value);
    }
    get id() {
        return _id.get(this);
    }
    
    set fields(value) {
        _fields.set(this,value);
    }
    get fields() {
        return _fields.get(this);
    }
    
    withId(id) {
        this.id = id;
        return this;
    }
    withResponseField(field) {
        this.fields[this.fields.length] = field;
        return this;
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
        if (!this.id) {
            throw new SdkException("Must specify image id");
        }

        var path = ["/v3/images", this.id, "similar"].join('/');

        var params = {};

        if (this.page > 0) {
            params.page = this.page;
        }
        if (this.pageSize > 0) {
            params.page_size = this.pageSize;
        }

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
                    throw new SdkException("No similar images were found");
                }
                next(null, response);
            }
        });
    }
}

module.exports = SimilarImages;