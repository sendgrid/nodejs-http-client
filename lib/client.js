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

function buildRequest(endpointRequest){
    var finalRequest = endpointRequest;
    return finalRequest;
}

var Client = function(globalRequest) {
    var globalRequest = globalRequest;
    
    this.API = function(endpointRequest, callback) {
        buildRequest(endpointRequest);
        var newRequest = JSON.parse(JSON.stringify(globalRequest));
        newRequest.host = endpointRequest.host || globalRequest.host;
        newRequest.method = endpointRequest.method;
        
        if( endpointRequest.queryParams !== {} ){
            newRequest.path = buildPath(endpointRequest.path, endpointRequest.queryParams);
        } else {
            newRequest.path = endpointRequest.path;
        }
        
        if ( globalRequest.headers !== {} ) {
            for (var attrname in globalRequest.headers) { 
                newRequest.headers[attrname] = globalRequest.headers[attrname]; 
            }
        }
        
        if( endpointRequest.headers !== {} ) {
            for (var attrname in endpointRequest.headers) { 
                newRequest.headers[attrname] = endpointRequest.headers[attrname]; 
            }
        } 
        
        var data = '';
        if( endpointRequest.requestBody !== {} ) {
            data = JSON.stringify(endpointRequest.requestBody);
            newRequest.headers['Content-Length'] = data.length;
        }
        
        var httpReq = http.request(newRequest, function(reply) {
            var responseBody = '';
            reply.on('data', function (chunk) {
                responseBody += chunk;
            });

            reply.on('end', function () {
                var res = JSON.parse(JSON.stringify(response));
                res.statusCode = reply.statusCode;
                res.responseBody = responseBody;
                res.responseHeaders = reply.headers
                callback(res);
            });    

        });
        
        httpReq.on('error', function(e) {
            console.log("Got error: " + e.message);
        });
        
        if( typeof endpointRequest.requestBody !== undefined ) {
            httpReq.write(data);
        }
        httpReq.end();        
    }
    
    return this;
};

module.exports = 
{
    Client: Client,
    request: request
}