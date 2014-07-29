var util = require('util'),
  schedules = require('./profile-schedules'),
  updates = require('./profile-updates'),

  endpoints = {
    get: 'profiles/%s',
  },

  proto = {
    get: function () {
      return this.api.get(util.format(endpoints.get, this.id), {authorize: true})
    },
  }

module.exports = function profile(api, id) {
  return Object.create(proto, {
    api: {value: api, enumerable: true},
    id: {value: id, enumerable: true},
    schedules: {value: schedules(api, id), enumerable: true},
    updates: {value: updates(api, id), enumerable: true},
  })
}