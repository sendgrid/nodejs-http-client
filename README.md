[![Build Status](https://travis-ci.org/sendgrid/rest.svg?branch=master)](https://travis-ci.org/sendgrid/nodejs-http-client)

**HTTP REST client, simplified for Node.js**

Here is a quick example:

`GET /your/api/{param}/call`

```javascript
var Client = require('sendgrid-rest').Client
var emptyRequest = require('sendgrid-rest').request
var client = new Client(globalRequest)
var request = JSON.parse(JSON.stringify(emptyRequest))
var param = 'myparam'
request.host = 'api.example.com'
request.method = 'GET'
request.path = '/your/api/' + param + '/call'
client.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.responseBody)
  console.log(response.responseHeaders)
})
```

`POST /your/api/{param}/call` with headers, query parameters and a request body.

```javascript
var Client = require('sendgrid-rest').Client
var emptyRequest = require('sendgrid-rest').request
var client = new Client(globalRequest)
var request = JSON.parse(JSON.stringify(emptyRequest))
request.host = 'api.example.com'
request.headers['Authorization'] = 'Bearer XXXXXX'
request.queryParams['limit'] = 100
request.queryParams['offset'] = 0
request.method = 'POST'
var param = 'myparam'
request.path = '/your/api/' + param + '/call'
requestBody = {
  'some': 0,
  'awesome': 1,
  'data': 3
}
request.requestBody = requestBody
client.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.responseBody)
  console.log(response.responseHeaders)
})
```

# Installation

`npm install sendgrid-rest`

## Usage ##

Following is an example using SendGrid. You can get your free account [here](https://sendgrid.com/free?source=python-http-client).

First, update your environment with your [SENDGRID_API_KEY](https://app.sendgrid.com/settings/api_keys).

```bash
echo "export SENDGRID_API_KEY='YOUR_API_KEY'" > sendgrid.env
echo "sendgrid.env" >> .gitignore
source ./sendgrid.env
```

Following is an abridged example, here is the [full working code](https://github.com/sendgrid/nodejs-http-client/blob/master/examples/example.js).

```bash
node examples/example
```

```javascript
var Client = require('sendgrid-rest').Client
var emptyRequest = require('sendgrid-rest').request

// These values persist across of subsequent calls, unless overidden.
var globalRequest = JSON.parse(JSON.stringify(emptyRequest))
globalRequest.host = 'api.sendgrid.com';
globalRequest.headers['Content-Type'] = 'application/json'
// You must add your SendGrid API Key to your OS Environment
globalRequest.headers['Authorization'] = 'Bearer '.concat(process.env.SENDGRID_API_KEY)
var client = new Client(globalRequest)

// GET Collection
var requestGet = JSON.parse(JSON.stringify(emptyRequest))
requestGet.method = 'GET'
requestGet.path = '/v3/api_keys'
requestGet.queryParams['limit'] = 100
requestGet.queryParams['offset'] = 0
client.API(requestGet, function (response) {
})

// POST
var requestBody = {
  'name': 'My API Key from Node.js',
  'scopes': [
    'mail.send',
    'alerts.create',
    'alerts.read'
  ]
}
var requestPost = JSON.parse(JSON.stringify(emptyRequest));
requestPost.method = 'POST'
requestPost.path = '/v3/api_keys'
requestPost.requestBody = requestBody
requestPost.headers['X-Test'] = 'test'
function createAPIKey (callback) {
  client.API(requestPost, function (response) {
    var body = JSON.parse(response.responseBody)
    callback(body.api_key_id)
  })
}

createAPIKey(function (returnValue) { // This ensures we POST a new key first, to get the api_key_id
  var api_key_id = '/'.concat(returnValue)

  // GET SINGLE
  var requestGetSingle = JSON.parse(JSON.stringify(emptyRequest))
  requestGetSingle.method = 'GET'
  requestGetSingle.path = '/v3/api_keys'.concat(api_key_id)
  client.API(requestGetSingle, function (response) {
  })

  // PATCH
  requestBody = {
    'name': 'A New Hope'
  }
  var requestPatch = JSON.parse(JSON.stringify(emptyRequest))
  requestPatch.method = 'PATCH'
  requestPatch.path = '/v3/api_keys'.concat(api_key_id)
  requestPatch.requestBody = requestBody
  client.API(requestPatch, function (response) {
  })

  // PUT
  requestBody = {
    'name': 'A New Hope',
    'scopes': [
      'user.profile.read',
      'user.profile.update'
    ]
  }
  var requestPut = JSON.parse(JSON.stringify(emptyRequest))
  requestPut.method = 'PUT'
  requestPut.path = '/v3/api_keys'.concat(api_key_id)
  requestPut.requestBody = requestBody
  client.API(requestPut, function (response) {
  })

  // DELETE
  var requestDelete = JSON.parse(JSON.stringify(emptyRequest))
  requestDelete.method = 'DELETE'
  requestDelete.path = '/v3/api_keys'.concat(api_key_id)
  client.API(requestDelete, function (response) {
  })
})

```

# Announcements

[2016.04.08] - We hit version 1!

# Roadmap

[Milestones](https://github.com/sendgrid/nodejs-http-client/milestones)

# How to Contribute

We encourage contribution to our libraries, please see our [CONTRIBUTING](https://github.com/sendgrid/nodejs-http-client/blob/master/CONTRIBUTING.md) guide for details.

* [Feature Request](https://github.com/sendgrid/nodejs-http-client/blob/master/CONTRIBUTING.md#feature_request)
* [Bug Reports](https://github.com/sendgrid/nodejs-http-client/blob/master/CONTRIBUTING.md#submit_a_bug_report)
* [Improvements to the Codebase](https://github.com/sendgrid/nodejs-http-client/blob/master/CONTRIBUTING.md#improvements_to_the_codebase)

# About

![SendGrid Logo]
(https://assets3.sendgrid.com/mkt/assets/logos_brands/small/sglogo_2015_blue-9c87423c2ff2ff393ebce1ab3bd018a4.png)

nodejs-http-client is guided and supported by the SendGrid [Developer Experience Team](mailto:dx@sendgrid.com).

nodejs-http-client is maintained and funded by SendGrid, Inc. The names and logos for nodejs-http-client are trademarks of SendGrid, Inc.