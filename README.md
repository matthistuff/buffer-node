# buffer-node
[![Build Status](https://img.shields.io/travis/matthistuff/buffer-node/master.svg?style=flat)](https://travis-ci.org/matthistuff/buffer-node) [![Code Climate](http://img.shields.io/codeclimate/github/matthistuff/buffer-node.svg?style=flat)](https://codeclimate.com/github/matthistuff/buffer-node)

buffer-node is a Node.js API Client for [Buffer](https://bufferapp.com/app)

## Installation
    $ npm install buffer-node

## Usage
Buffer-node offers an easy to use wrapper for the [Buffer API](https://bufferapp.com/developers/api).

* *Example:**
```js
var bufferAPI = require('buffer-node'),
  api = bufferAPI('{{user access token}}')

api.user.get().then(function(response) {
  console.log(response)
})
```

### Authentication
Buffer uses OAuth 2.0 for authorization. It is recommended to use a library such as [Passport](http://passportjs.org) to authorize and retrieve an access token for the user.

### API client creation
When requiring the buffer-node module, a factory function for the API client will be returned. Simply pass an access token and the ready to use client will be returned.

```js
var bufferAPI = require('buffer-node'),
  api = bufferAPI('{{user access token}}')
```
  
### API requests
API requests always return a promise using the [promise](https://www.npmjs.org/package/promise) module. You should then use one of the supplied methods to handle successful calls and errors.


