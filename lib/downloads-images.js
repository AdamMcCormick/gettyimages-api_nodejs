"use strict";
var qs = require("querystring");
var SdkException = require("./sdkexception.js");
var WebHelper = require("./webhelper.js");
var GettyApiRequest = require("./baseclasses/gettyApiRequest.js");

const _id = new WeakMap();
const _fileType = new WeakMap();
const _height = new WeakMap();
const _details = new WeakMap();
const _productType = new WeakMap();
const _productId = new WeakMap();

class ImagesDownloads extends GettyApiRequest {    
    set id(value) {
        _id.set(this,value);
    }
    get id() {
        return _id.get(this);
    }
    
    set fileType(fileType) {
        _fileType.set(this,fileType);
    }
    
    get fileType() {
        return _fileType.get(this);
    }
    
    set height(height) {
        _height.set(this,height);
    }
    
    get height() {
        return _height.get(this);
    }

    set details(details) {
        _details.set(this,details);
    }

    get details() {
        return _details.get(this);
    }

    set productType(productType) {
        _productType.set(this,productType);
    }

    get productType() {
        return _productType.get(this);
    }

    set productId(productId) {
        _productId.set(this,productId);
    }

    get productId() {
        return _productId.get(this);
    }
    
    withFileType(fileType) {
        this.fileType = fileType ;
        return this;
    }
    
    withId(id) {
        this.id = id;
        return this;
    }

    withHeight(height) {
        this.height = height;
        return this;
    }

    withDownloadDetails(details) {
        this.details = details;
        return this;
    }

    withProductType(productType) {
        this.productType = productType;
        return this;
    }

    withProductId(productId) {
        this.productId = productId;
        return this;
    }
 
    execute(callback) {
        var id = this.id;
        var credentials = this.credentials;
        var hostName = this.hostName;
        var fileType = this.fileType;
        var height = this.height;
        var details = this.details;
        var productType = this.productType;
        var productId = this.productId;
                
        if(!id) {
            throw new SdkException("must specify an image id");
        }
        
        var path = "/v3/downloads/images/";
        path += this.id;
        var params = { auto_download: false };
        if (fileType) {
            params.file_type = fileType;
        }
        
        if (height) {
            params.height = height;
        }

        if (productType) {
            params.productType = productType;
        }

        if (productId) {
            params.productId = productId;
        }

        path += "?" + qs.stringify(params);

        var webHelper = new WebHelper(credentials, hostName);
        webHelper.postQuery(path, details, function (err, response) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, response);
            }
        });
    }
}

module.exports = ImagesDownloads;