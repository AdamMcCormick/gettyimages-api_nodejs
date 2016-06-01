"use strict";

var SearchEvents = require("./searchevents.js");
var SearchImages = require("./searchimages.js");
var SearchVideos = require("./searchvideos.js");
var GettyApiRequest = require("./baseclasses/gettyApiRequest.js");

class Search extends GettyApiRequest {
    events() {
        return new SearchEvents(this.credentials,this.hostName);
    }

    images() {
        return new SearchImages(this.credentials,this.hostName);
    }
    
    videos() {
        return new SearchVideos(this.credentials,this.hostName);
    }
}

module.exports = Search;
