# Change Log
All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/).

## [2.4.0] - 2017-07-14
### Added
- Pull #8
- Ability to optionally assign port for requests when calling client API
- Thanks [Anand Patel](https://github.com/apat183)!

## [2.3.0] - 2016-10-12
### Added
- Pull #6, Solves #5
- Invoke the API callback with a mocked response on Error
- Thanks [Dan Foley](https://github.com/cantremember)!

## [2.2.2] - 2016-09-27
### Fixed
- Fix GitHub URLs in `package.json` #4: https://github.com/sendgrid/sendgrid-nodejs/pull/4
- Thanks [Guilherme Souza](https://github.com/sitegui)!

## [2.2.1] - 2016-06-15
### Fixed
- Send email with accents: https://github.com/sendgrid/sendgrid-nodejs/issues/239
- Thanks [eaparango](https://github.com/eaparango)!

## [2.2.0] - 2016-06-10
### Added
- Automatically add **Header** in HTTP request whenever there is a request body `Content-Type: application/json`

## [2.1.0] - 2016-06-08
### Added
- Cleaner request object initialization
- Ability to use HTTP for testing

## [2.0.0] - 2016-06-06
### Changed
- Request and Response variables are non-redundant. Example: `request.requestBody` changed to `request.body`

## [1.0.1] - 2016-04-08
### Added
- We are live!
