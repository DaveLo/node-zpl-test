# Zebra Print from Web Test App #

Small collection of scripts meant to serve a static file that triggers a zebra printer to print a shipping label. Proof of concept for Southtree related logistics upgrade.

## Table of Contents ##
 - [Current Status](#current-status)
 - [Installation](#installation)
 - [Dependencies](#dependencies)
 - [Versioning](#versioning)

## Current Status ##

Pre-release status, many large changes still happening as I push towards V1, please keep an eye on the [Changelog](./CHANGELOG.md)

## Installation ##
First clone repo:

`git clone https://github.com/Southtree/service.email.git {# project folder name #}`

For development use next install NPM packages:

```bash
npm install
composer intall
```

## Dependencies ##

- [NodeJS](https://nodejs.org/en/) Server
- [ExpressJS](https://expressjs.com/) Framework for serving the API
- [Sendgrid API](https://github.com/sendgrid/sendgrid-nodejs) Library to connect with [SendGrid](https://sendgrid.com/docs/API_Reference/api_v3.html) Mail Service
- [Bunyan Logger](https://github.com/trentm/node-bunyan) Logging utility with JSON output

## Versioning

We use [SemVar](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/Southtree/service.email/tags).
