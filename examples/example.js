var Client = require('../lib/client.js');
var globalRequest = {};
globalRequest.host = 'e9sk3d3bfaikbpdq7.stoplight-proxy.io';
globalRequest.headers = {};
globalRequest.headers['Content-Type'] = 'application/json';
globalRequest.headers['Authorization'] = 'Bearer '.concat(process.env.SENDGRID_API_KEY);
var client = new Client(globalRequest);
console.log(client.request);

// GET Collection
var requestGet = {};
requestGet.method = 'GET';
requestGet.path = '/v3/api_keys';
requestGet.queryParams = {};
requestGet.queryParams["limit"] = 100;
requestGet.queryParams["offset"] = 0;
client.API(requestGet, function (response){
    console.log(response.statusCode);
    console.log(response.responseBody);
    console.log(response.responseHeaders);
});

// POST
requestBody = {
        "name": "My API Key from Node.js",
        "scopes": [
            "mail.send",
            "alerts.create",
            "alerts.read"
        ]
    }
var requestPost = {};
requestPost.method = 'POST';
requestPost.path = '/v3/api_keys';
requestPost.requestBody = requestBody;
requestPost.headers = {};
requestPost.headers['X-Test'] = 'test';
function createAPIKey(callback){
    client.API(requestPost, function (response){
        console.log(response.statusCode);
        console.log(response.responseBody);
        console.log(response.responseHeaders);
        var body = JSON.parse(response.responseBody);
        callback(body.api_key_id);
    });
}

createAPIKey(function(returnValue) {
    api_key_id = '/'.concat(returnValue);

    // GET SINGLE
    var requestGetSingle = {};
    requestGetSingle.method = 'GET';
    requestGetSingle.path = '/v3/api_keys'.concat(api_key_id);
    client.API(requestGetSingle, function (response){
        console.log(response.statusCode);
        console.log(response.responseBody);
        console.log(response.responseHeaders);
    });
    
    // PATCH
    requestBody = {
        "name": "A New Hope"
    }
    var requestPatch = {};
    requestPatch.method = 'PATCH'
    requestPatch.path = '/v3/api_keys'.concat(api_key_id);
    requestPatch.requestBody = requestBody;
    client.API(requestPatch, function (response){
        console.log(response.statusCode);
        console.log(response.responseBody);
        console.log(response.responseHeaders);
    });   
    
    // PUT
    requestBody = {
        "name": "A New Hope",
        "scopes": [
            "user.profile.read",
            "user.profile.update"
        ]
    }
    var requestPut = {};
    requestPut.method = 'PUT';
    requestPut.path = '/v3/api_keys'.concat(api_key_id);
    requestPut.requestBody = requestBody;
    client.API(requestPut, function (response){
        console.log(response.statusCode);
        console.log(response.responseBody);
        console.log(response.responseHeaders);
    });  

    // DELETE
    var requestDelete = {};
    requestDelete.method = 'DELETE';
    requestDelete.path = '/v3/api_keys'.concat(api_key_id);
    client.API(requestDelete, function (response){
        console.log(response.statusCode);
        console.log(response.responseBody);
        console.log(response.responseHeaders);
    });
});