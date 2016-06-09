"use strict";
var SdkException = require("./sdkexception");
var DownloadsVideos = require("./downloads-videos");
var DownloadsImages = require("./downloads-images");
var WebHelper = require("./webhelper.js");
var GettyApiRequest = require("./baseclasses/gettyApiRequest.js");

class Downloads extends GettyApiRequest {    
    constructor(credentials, hostName, overrideCredentials) {
        super(credentials,hostName);
        
        if(!overrideCredentials) {
            credentials.verifyClientCredentials();
        }

        this.page = 0;
        this.pageSize = 0;
        this.dateFrom = null;
        this.dateTo = null;
        this.productType = null;
    }
    
    videos() {
        return new DownloadsVideos(this.credentials, this.hostName);
    }
        
    images(){
        return new DownloadsImages(this.credentials, this.hostName);
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
        if (this.productType) {
            params.product_type = this.productType;
        }
        var path = "/v3/downloads";
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
    withProductType(productType) {
        this.productType = productType;
        return this;
    }
}

module.exports = Downloads;