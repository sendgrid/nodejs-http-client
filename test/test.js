var assert = require('chai').assert;
var expect = require('chai').expect;
var should = require('chai').should();
var nock = require('nock');

var test_host = 'https://api.test.com';

var Client = require('../lib/client.js').Client;
var emptyRequest = require('../lib/client.js').request;
var globalRequest = JSON.parse(JSON.stringify(emptyRequest));
globalRequest.host = 'api.test.com';
var client = new Client(globalRequest);

describe('Client', function() {
    describe('#buildPath()', function() {
      it('should create a properly encoded URL', function(done) {
        nock(test_host)
            .get('/test')
            .query({limit: 100, offset: 0})
            .reply(200, {
                message: 'Success'
                });
        
        var client = new Client(globalRequest);
        var requestGet = JSON.parse(JSON.stringify(emptyRequest));
        requestGet.method = 'GET';
        requestGet.path = '/test';
        requestGet.queryParams["limit"] = 100;
        requestGet.queryParams["offset"] = 0;
        client.API(requestGet, function (response){
            assert.equal(response.statusCode, '200', 'response.StatusCode equal 200');
            assert.equal(response.responseBody, '{"message":"Success"}', 'response.responseBody equal {"message":"Success"}');
            assert.equal(JSON.stringify(response.responseHeaders), '{"content-type":"application/json"}', 'response.responseHeaders equal { \'content-type\': \'application/json\' }');
            done();
        });
      });
    });
    
    describe('#buildRequest()', function() {
      it('should create a valid request object', function(done) {
        nock(test_host)
            .post('/test')
            .query({limit: 100, offset: 0})
            .reply(201, function(uri, requestBody) {
                var response = {};
                response.path = this.req.path;
                response.headers = this.req.headers;
                return response;
            });
        
        requestBody = {
            "test": "Test Body"
        }
        var client = new Client(globalRequest);
        var requestPost = JSON.parse(JSON.stringify(emptyRequest));
        requestPost.method = 'POST';
        requestPost.path = '/test';
        requestPost.requestBody = requestBody;
        requestPost.queryParams["limit"] = 100;
        requestPost.queryParams["offset"] = 0;
        requestPost.headers['X-Test'] = 'test';
        client.API(requestPost, function (response){
            assert.equal(response.statusCode, '201', 'response.StatusCode equal 200');
            assert.equal(JSON.parse(response.responseBody).path, "/test?limit=100&offset=0", 'path equal to /test?limit=100&offset=0');
            assert.equal(JSON.stringify(JSON.parse(response.responseBody).headers), '{"x-test":"test","content-length":20,"host":"api.test.com"}', 'headers equal {"x-test":"test","content-length":20,"host":"api.test.com"}');
            assert.equal(JSON.stringify(response.responseHeaders), '{"content-type":"application/json"}', 'response.responseHeaders equal { \'content-type\': \'application/json\' }');
            done();
        });
      });
    });
    
    // Test each verb
    describe('#API()', function() {
      it('should create a valid API call', function(done) {
        nock(test_host)
            .get('/test')
            .reply(200, {
                message: 'Success'
                });
        var client = new Client(globalRequest);
        var requestGet = JSON.parse(JSON.stringify(emptyRequest));
        requestGet.method = 'GET';
        requestGet.path = '/test';
        client.API(requestGet, function (response){
            assert.equal(response.statusCode, '200', 'response.StatusCode equal 200');
            assert.equal(response.responseBody, '{"message":"Success"}', 'response.responseBody equal {"message":"Success"}');
            assert.equal(JSON.stringify(response.responseHeaders), '{"content-type":"application/json"}', 'response.responseHeaders equal { \'content-type\': \'application/json\' }');
        });
        
        nock(test_host)
            .post('/test')
            .reply(201, {
                message: 'Success'
                });
        requestBody = {
            "test": "Test Body"
        }
        var client = new Client(globalRequest);
        var requestPost = JSON.parse(JSON.stringify(emptyRequest));
        requestPost.requestBody = requestBody;
        requestPost.method = 'POST';
        requestPost.path = '/test';
        client.API(requestPost, function (response){
            assert.equal(response.statusCode, '201', 'response.StatusCode equal 201');
            assert.equal(response.responseBody, '{"message":"Success"}', 'response.responseBody equal {"message":"Success"}');
            assert.equal(JSON.stringify(response.responseHeaders), '{"content-type":"application/json"}', 'response.responseHeaders equal { \'content-type\': \'application/json\' }');
        });
        
        nock(test_host)
            .patch('/test')
            .reply(200, {
                message: 'Success'
                });
        var client = new Client(globalRequest);
        var requestPatch = JSON.parse(JSON.stringify(emptyRequest));
        requestPatch.requestBody = requestBody;
        requestPatch.method = 'PATCH';
        requestPatch.path = '/test';
        client.API(requestPatch, function (response){
            assert.equal(response.statusCode, '200', 'response.StatusCode equal 200');
            assert.equal(response.responseBody, '{"message":"Success"}', 'response.responseBody equal {"message":"Success"}');
            assert.equal(JSON.stringify(response.responseHeaders), '{"content-type":"application/json"}', 'response.responseHeaders equal { \'content-type\': \'application/json\' }');
        });
 
        nock(test_host)
            .put('/test')
            .reply(200, {
                message: 'Success'
                });
        var client = new Client(globalRequest);
        var requestPut = JSON.parse(JSON.stringify(emptyRequest));
        requestPut.requestBody = requestBody;
        requestPut.method = 'PUT';
        requestPut.path = '/test';
        client.API(requestPut, function (response){
            assert.equal(response.statusCode, '200', 'response.StatusCode equal 200');
            assert.equal(response.responseBody, '{"message":"Success"}', 'response.responseBody equal {"message":"Success"}');
            assert.equal(JSON.stringify(response.responseHeaders), '{"content-type":"application/json"}', 'response.responseHeaders equal { \'content-type\': \'application/json\' }');
        });  
        
        nock(test_host)
            .delete('/test')
            .reply(204, {
                message: 'Success'
                });
        var client = new Client(globalRequest);
        var requestDelete = JSON.parse(JSON.stringify(emptyRequest));
        requestDelete.requestBody = requestBody;
        requestDelete.method = 'DELETE';
        requestDelete.path = '/test';
        client.API(requestDelete, function (response){
            assert.equal(response.statusCode, '204', 'response.StatusCode equal 204');
            assert.equal(response.responseBody, '{"message":"Success"}', 'response.responseBody equal {"message":"Success"}');
            assert.equal(JSON.stringify(response.responseHeaders), '{"content-type":"application/json"}', 'response.responseHeaders equal { \'content-type\': \'application/json\' }');
        });      
        done();
      });
    });
    
});