var util = require('util'),

  endpoints = {
    'get': 'updates/%s/interactions',
  },

  proto = {
    get: function () {
      return this.api.get(util.format(endpoints.get, this.updateId), {authorize: true})
    },
  }

module.exports = function update(api, updateId) {
  return Object.create(proto, {
    api: {value: api, enumerable: true},
    updateId: {value: updateId, enumerable: true},
  })
}