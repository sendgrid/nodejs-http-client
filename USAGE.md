Following is an example using SendGrid. You can get your free account [here](https://sendgrid.com/free?source=nodejs-http-client).

First, update your environment with your [SENDGRID_API_KEY](https://app.sendgrid.com/settings/api_keys).

```bash
echo "export SENDGRID_API_KEY='YOUR_API_KEY'" > sendgrid.env
echo "sendgrid.env" >> .gitignore
source ./sendgrid.env
```

Here is the [full working code](https://github.com/sendgrid/nodejs-http-client/blob/master/examples/example.js).

To run the example:

```bash
node examples/example
```

 # Documentation
 
 If you would like to auto-generate documentation of the packages, you can do so locally by running:

 `./node_modules/.bin/esdoc`

 Using the .esdoc.json file, esdoc will create documentation in the docs directory. 
 
 ## Checking docs coverage
 
 You will find a coverage.json file in the **docs** directory. This will contain information about the documentation coverage for each of the different files in this repo.