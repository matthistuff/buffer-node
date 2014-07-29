var util = require('util'),

  endpoints = {
    get: 'profiles/%s/schedules',
    update: 'profiles/%s/schedules/update',
  },

  proto = {
    get: function () {
      return this.api.get(util.format(endpoints.get, this.profileId), {authorize: true})
    },

    update: function (schedules) {
      return this.api.post(util.format(endpoints.update, this.profileId), {
        authorize: true,
        form: {
          schedules: schedules
        }
      })
    },
  }

module.exports = function schedules(api, profileId) {
  return Object.create(proto, {
    api: {value: api, enumerable: true},
    profileId: {value: profileId, enumerable: true},
  })
}