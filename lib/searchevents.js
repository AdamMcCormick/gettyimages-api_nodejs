"use strict";
var querystring = require("querystring");
var SdkException = require("./sdkexception.js");
var WebHelper = require("./webhelper.js");
var GettyApiRequest = require("./baseclasses/gettyApiRequest.js");

class SearchEvents extends GettyApiRequest {
    constructor(credentials, hostName) {
        super(credentials,hostName);
        this.editorialSegment = null;
        this.dateFrom = null;
        this.dateTo = null;
        this.fields = [];
    }
    
    execute(next) {
        if (!this.editorialSegment) {
            throw new SdkException("This API requires an editorial segment");
        }

        var params = {};
        params.editorial_segment = this.editorialSegment;

        if (this.dateFrom) {
            params.date_from = this.dateFrom;
        }
        if (this.dateTo) {
            params.date_to = this.dateTo;
        }
        if (this.fields.length > 0) {
            params.fields = this.fields.join(",");
        }
        
        var path = "/v3/search/events";

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
      
    withEditorialSegment(editorialSegment) {
        this.editorialSegment = editorialSegment;
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
    withResponseField(field) {
        this.fields[this.fields.length] = field;
        return this;
    }
}

module.exports = SearchEvents;