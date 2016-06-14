"use strict";

var PurchasedAssets = require("./purchased-assets");
var PurchasedImages = require("./purchased-images");
var GettyApiRequest = require("./baseclasses/gettyApiRequest.js");

class Purchases extends GettyApiRequest {    
    constructor(credentials, hostName) {
        super(credentials,hostName);
    }
    
    assets() {
        return new PurchasedAssets(this.credentials, this.hostName);
    }
        
    images(){
        return new PurchasedImages(this.credentials, this.hostName);
    }
}

module.exports = Purchases;