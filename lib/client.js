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

var Client = function(globalRequest) {
    var globalRequest = globalRequest;
    var emptyResponse = JSON.parse(JSON.stringify(response));
    var requestBody = '';

    function isEmpty(obj) {
        for(var key in obj){
            if(obj.hasOwnProperty(key)){
                return false;
            }     
        }
        return true;
    }

    function buildPath(basePath, queryParams){
        basePath = basePath.concat('?');
        var url = basePath.concat(queryString.stringify(queryParams));
        return url;
    }

    function buildRequest(globalRequest, endpointRequest){
        var request = JSON.parse(JSON.stringify(globalRequest));
        request.host = endpointRequest.host || globalRequest.host;
        request.method = endpointRequest.method;
        
        if( !isEmpty(endpointRequest.queryParams) ){
            request.path = buildPath(endpointRequest.path, endpointRequest.queryParams);
        } else {
            request.path = endpointRequest.path;
        }
        
        if( !isEmpty(endpointRequest.headers) ) {
            for (var attrname in endpointRequest.headers) { 
                request.headers[attrname] = endpointRequest.headers[attrname]; 
            }
        }
         
        if( !isEmpty(endpointRequest.requestBody) ) {
            requestBody = JSON.stringify(endpointRequest.requestBody);
            request.headers['Content-Length'] = requestBody.length;
        }
        
        return request;
    }
    
    this.API = function(endpointRequest, callback) {
        var request = buildRequest(globalRequest, endpointRequest);
        
        var httpRequest = http.request(request, function(httpResponse) {
            var responseBody = '';
            
            httpResponse.on('data', function (chunk) {
                responseBody += chunk;
            });

            httpResponse.on('end', function () {
                var response = JSON.parse(JSON.stringify(emptyResponse));
                response.statusCode = httpResponse.statusCode;
                response.responseBody = responseBody;
                response.responseHeaders = httpResponse.headers
                callback(response);
            });    

        });
        
        httpRequest.on('error', function(e) {
            console.log("Got error: " + e.message);
        });
        
        if( !isEmpty(endpointRequest.requestBody) ) {
            httpRequest.write(requestBody);
        }
        
        httpRequest.end();        
    }
    
    return this;
};

module.exports = 
{
    Client: Client,
    request: request
}