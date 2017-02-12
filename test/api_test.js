var request = require("request");
var sinon = require('sinon');
var server = require("../app_test.js")
var expect  = require("chai").expect;

var mongoose = require('mongoose');
require('sinon-mongoose');

var ProductsSchema = require("../models/ProductsSchema");
var base_url = "http://localhost:8080"

describe("API TEST", function () {
    describe("TEST : /products/findAll", function () {
        var url = base_url +  "/products/findAll";

        it("returns status 200", function(done) {
            request(url, function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });

        it("DB's data", function(done) {
            request(url, function(error, response, body) {
                ProductsSchema.find(function (err, result) {
                    // console.log("url : ");
                    // console.log(body);
                    // console.log(result);
                    // console.log("config : ");
                    expect(body).to.be.equal(JSON.stringify(result));
                    done();
                });
            });
        });
    })


    describe("TEST : /products ", function () {
        var url = base_url +  "/products";

        it("returns status 200", function(done) {
            request(url, function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
                server.closeServer();
            });
        });
    })
});