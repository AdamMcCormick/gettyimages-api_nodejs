"use strict";

var querystring = require("querystring");
var SdkException = require("./sdkexception");
var WebHelper = require("./webhelper.js");
var GettyApiRequest = require("./baseclasses/gettyApiRequest.js");

class PurchasedImages extends GettyApiRequest {    
    constructor(credentials, hostName) {
        super(credentials,hostName);

        this.page = 0;
        this.pageSize = 0;
        this.dateFrom = null;
        this.dateTo = null;
    }

    execute(next) {
        var params = {};
        if (this.page > 0) {
            params.page = this.page;
        }
        if (this.pageSize > 0) {
            params.page_size = this.pageSize;
        }
        if (this.dateFrom) {
            params.date_from = this.dateFrom;
        }
        if (this.dateTo) {
            params.date_to = this.dateTo;
        }
        var path = "/v3/purchased-images";
        var query = querystring.stringify(params);
        path += "?" + query;

        var webHelper = new WebHelper(this.credentials, this.hostName);
        webHelper.get(path, function (err, response) {
            if (err) {
                next(err, null);
            } else {
                next(null, response);
            }
        });
    }

    withPage(page) {
        this.page = page;
        return this;
    }
    withPageSize(pageSize) {
        this.pageSize = pageSize;
        return this;
    }
    withDateFrom(dateFrom) {
        this.dateFrom = dateFrom;
        return this;
    }
    withDateTo(dateTo) {
        this.dateTo = dateTo;
        return this;
    }
}

module.exports = PurchasedImages;