## Table of Contents
* [Viewing the Response Body](#response-body)

<a name="response-body"></a>
## Viewing the Request Body

When debugging or testing, it may be useful to exampine the raw request body to compare against the [documented format](https://sendgrid.com/docs/API_Reference/api_v3.html).

You can do this just before you call `client.API(request, function (response) {...});` like so:

```js
console.log(request.body)
```
