var api = require("../../gettyimages-api");
var nock = require("nock");

module.exports = function () {

    this.Given(/^I want a user's products$/, function (callback) {
        callback();
    });

    this.Given(/^I specify product field (.*)$/, function (field, callback) {
        if (!this.fields) {
            this.fields = [];
        }

        this.fields.push(field);
        callback();
    });

    this.When(/^I retrieve products$/, function (callback) {
        getProducts(this, callback);
    });

    this.Then(/^I get a response back that has my user's product list$/, function (callback) {
        // noop
        callback();
    });

    function getProducts(context, callback) {
        nock("https://api.gettyimages.com")
            .post("/oauth2/token", "client_id=apikey&client_secret=apisecret&grant_type=client_credentials")
            .reply(200, {
                access_token: "client_credentials_access_token",
                token_type: "Bearer",
                expires_in: "1800"
            })
            .post("/oauth2/token", "client_id=apikey&client_secret=apisecret&grant_type=password&username=username&password=password")
            .reply(200, {
                access_token: "resource_owner_access_token",
                token_type: "Bearer",
                expires_in: "1800",
                refresh_token: "refreshtoken"
            })
            .get("/v3/products")
            .query({ fields: context.fields ? encodeURI(context.fields.join(",")) : null })
            .reply(200, {"products": []})

        var client = new api({ apiKey: context.apikey, apiSecret: context.apisecret, username: context.username, password: context.password });
        var products = client.products();

        if (context.fields) {
            context.fields.forEach(function (field) {
                products = products.withResponseField(field);
            }, this);
        }
        try
        {
            products.execute(function (err, response) {
                context.error = err;
                context.response = response;
                callback();
            });
        }
        catch (exception) {
            context.error = exception;
            callback();
        }
    }
};