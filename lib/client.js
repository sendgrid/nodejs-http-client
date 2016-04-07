"use strict";

var http = require('https');
var queryString = require('querystring');

var request = {
    host: '',
    method:'',
    path:'',
    headers: {},
    requestBody: {},
    queryParams: {} 
}

var response = {
    "statusCode": '',
    "responseBody": {},
    "responseHeaders": {}
}

function buildPath(basePath, queryParams){
    basePath = basePath.concat('?');
    var url = basePath.concat(queryString.stringify(queryParams));
    return url;
}

function buildRequest(newRequest){
    console.log(newRequest);
    var finalRequest = newRequest;
    return finalRequest;
}

var Client = function(req) {
     
    request = req;
    
    this.API = function(req, callback) {
        buildRequest(request);
        var newRequest = {};
        newRequest.headers = {};
        newRequest.requestBody = {};
        newRequest.queryParams = {};
        newRequest.host = req.host || request.host;
        newRequest.method = req.method;
        
        if( req.queryParams !== undefined ){
            newRequest.path = buildPath(req.path, req.queryParams);
        } else {
            newRequest.path = req.path;
        }
        delete req.queryParams;
        
        if ( request.headers !== undefined) {
            for (var attrname in request.headers) { 
                newRequest.headers[attrname] = request.headers[attrname]; 
            }
        }
        
        if( req.headers !== undefined ) {
            for (var attrname in req.headers) { 
                newRequest.headers[attrname] = req.headers[attrname]; 
            }
        } 
        
        var data = '';
        if( req.requestBody !== undefined ) {
            data = JSON.stringify(req.requestBody)
            newRequest.headers['Content-Length'] = data.length;
        }
        delete req.requestBody;
        
        var httpReq = http.request(newRequest, function(reply) {
            var responseBody = '';
            reply.on('data', function (chunk) {
                responseBody += chunk;
            });

            reply.on('end', function () {
                var res = response;
                res.statusCode = reply.statusCode;
                res.responseBody = responseBody;
                res.responseHeaders = reply.headers
                callback(res);
            });    

        });
        
        httpReq.on('error', function(e) {
            console.log("Got error: " + e.message);
        });
        
        if( typeof req.requestBody !== undefined ) {
            httpReq.write(data);
        }
        httpReq.end();        
    }
    
    this.response = response;
    
    return this;
};

module.exports = Client;