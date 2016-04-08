var Client = require('../lib/client.js').Client
var emptyRequest = require('../lib/client.js').request

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
  console.log(response.statusCode)
  console.log(response.responseBody)
  console.log(response.responseHeaders)
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
    console.log(response.statusCode)
    console.log(response.responseBody)
    console.log(response.responseHeaders)
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
    console.log(response.statusCode)
    console.log(response.responseBody)
    console.log(response.responseHeaders)
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
    console.log(response.statusCode)
    console.log(response.responseBody)
    console.log(response.responseHeaders)
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
    console.log(response.statusCode)
    console.log(response.responseBody)
    console.log(response.responseHeaders)
  })

  // DELETE
  var requestDelete = JSON.parse(JSON.stringify(emptyRequest))
  requestDelete.method = 'DELETE'
  requestDelete.path = '/v3/api_keys'.concat(api_key_id)
  client.API(requestDelete, function (response) {
    console.log(response.statusCode)
    console.log(response.responseBody)
    console.log(response.responseHeaders)
  })
})
