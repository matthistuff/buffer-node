var util = require('util'),
  merge = require('lodash.merge'),
  assign = require('lodash.assign'),
  omit = require('lodash.omit'),
  request = require('request'),
  Promise = require('promise'),

  helpers = require('./helpers'),
  info = require('./objects/info'),
  links = require('./objects/links'),
  profile = require('./objects/profile'),
  profiles = require('./objects/profiles'),
  update = require('./objects/update'),
  updates = require('./objects/updates'),
  user = require('./objects/user'),

  apiURL = 'https://api.bufferapp.com/1/%s.json'

  const HTTP_OK = 200;

  function hasInvalidResponseBody(body) {
    return (body && typeof(body.success) !== "undefined" && !body.success);
  }

  bufferCore = {
    post: function (endpoint, options, responseFilter) {
      return this.createRequest('post', endpoint, options, responseFilter)
    },

    get: function (endpoint, options, responseFilter) {
      return this.createRequest('get', endpoint, options, responseFilter)
    },

    createRequest: function (method, endpoint, options, responseFilter) {
      var requestOptions = this.buildRequest(method, endpoint, options),
        self = this

      return new Promise(function (resolve, reject) {
        self.runRequest(requestOptions, function (err, res, body) {

          if (body) {
            body = JSON.parse(body)
          }

          if (err) {
            return reject(err)
          } else if (res.statusCode !== HTTP_OK || hasInvalidResponseBody(body)) {
            var errorMessage;
            if (body) {
              if (body.error) {
                errorMessage = body.error;
              } else {
                errorMessage = body.message;
              }

              err = new Error(util.format(errorMessage))

              err.errorCode = body.code
            } else {
              err = new Error(util.format('API response error: %s', res.statusCode))
              err.errorCode = res.statusCode
            }
            err.httpCode = res.statusCode
            return reject(err)
          }

          if (responseFilter) {
            body = responseFilter(body)
          }

          return resolve(body)
        })
      })
    },

    buildRequest: function (method, endpoint, options) {
      var opts = {
        url: util.format(apiURL, endpoint),
        method: method,
        headers: {}
      }

      if (options && options.authorize) {
        opts.headers.Authorization = util.format('Bearer %s', this.accessToken)
      }

      return merge(opts, omit(options, ['authorize']))
    },

    runRequest: function (options, callback) {
      request(options, callback)
    }
  },

  bufferApiObjects = {
    profile: function (id) {
      return profile(this, id)
    },

    update: function (id) {
      return update(this, id)
    },
  }

module.exports = function bufferApi(accessToken) {
  var client = Object.create(assign(
    {},
    bufferCore,
    bufferApiObjects
  ), {accessToken: {value: accessToken, enumerable: true}})

  client.helpers = helpers()
  client.user = user(client)
  client.links = links(client)
  client.info = info(client)
  client.profiles = profiles(client)
  client.updates = updates(client)

  return client
};