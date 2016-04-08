'use strict'

var http = require('https')
var queryString = require('querystring')

// request holds the request to an API Call, use this as an initializer
// like so: JSON.parse(JSON.stringify(request))
var request = {
  host: '',
  method: '',
  path: '',
  headers: {},
  requestBody: {},
  queryParams: {}
}

// response holds the response from an API call, use this as an initializer
// like so: JSON.parse(JSON.stringify(response))
var response = {
  'statusCode': '',
  'responseBody': {},
  'responseHeaders': {}
}

// Client allows for quick and easy access any REST or REST-like API.
function Client (globalRequest) {
  var emptyResponse = JSON.parse(JSON.stringify(response))
  var requestBody = ''

  // utility function to detect empty objects
  function isEmpty (obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        return false
      }
    }
    return true
  }

  // add query paramaters to a URL
  function buildPath (basePath, queryParams) {
    basePath = basePath.concat('?')
    var url = basePath.concat(queryString.stringify(queryParams))
    return url
  }

  function buildRequest (globalRequest, endpointRequest) {
    var request = JSON.parse(JSON.stringify(globalRequest))
    request.host = endpointRequest.host || globalRequest.host
    request.method = endpointRequest.method

    // build URL
    request.path = !isEmpty(endpointRequest.queryParams)
      ? buildPath(endpointRequest.path, endpointRequest.queryParams)
      : endpointRequest.path

    // add headers
    if (!isEmpty(endpointRequest.headers)) {
      for (var attrname in endpointRequest.headers) {
        request.headers[attrname] = endpointRequest.headers[attrname]
      }
    }

    // add the request body's content length
    if (!isEmpty(endpointRequest.requestBody)) {
      requestBody = JSON.stringify(endpointRequest.requestBody)
      request.headers['Content-Length'] = requestBody.length
    }

    return request
  }

  // API is the main interface to the API.
  this.API = function (endpointRequest, callback) {
    var request = buildRequest(globalRequest, endpointRequest)

    var httpRequest = http.request(request, function (httpResponse) {
      var responseBody = ''

      // cature the response from the API
      httpResponse.on('data', function (chunk) {
        responseBody += chunk
      })

      // after the call is complete, build the response object
      httpResponse.on('end', function () {
        var response = JSON.parse(JSON.stringify(emptyResponse))
        response.statusCode = httpResponse.statusCode
        response.responseBody = responseBody
        response.responseHeaders = httpResponse.headers
        callback(response)
      })
    })

    httpRequest.on('error', function (e) {
      console.log('Error: ' + e.message)
    })

    // if thre is a request body, sent it
    if (!isEmpty(endpointRequest.requestBody)) {
      httpRequest.write(requestBody)
    }

    httpRequest.end()
  }

  return this
}

module.exports =
{
  Client: Client,
  request: request
}
