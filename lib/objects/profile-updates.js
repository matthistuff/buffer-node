var util = require('util'),
  _ = require('lodash'),

  endpoints = {
    pending: 'profiles/%s/updates/pending',
    sent: 'profiles/%s/updates/sent',
    reorder: 'profiles/%s/updates/reorder',
    shuffle: 'profiles/%s/updates/shuffle',
  },

  proto = {
    pending: function () {
      return this.api.get(util.format(endpoints.pending, this.profileId), {authorize: true})
    },

    sent: function () {
      return this.api.get(util.format(endpoints.sent, this.profileId), {authorize: true})
    },

    reorder: function (order, options) {
      var data = {
        order: order,
      }

      if (options) {
        _.assign(data, _.pick(options, ['offset', 'utc']))
      }

      return this.api.post(util.format(endpoints.reorder, this.profileId), {authorize: true, form: data})
    },

    shuffle: function (options) {
      var data = {}

      if (options) {
        _.assign(data, _.pick(options, ['count', 'utc']))
      }

      return this.api.post(util.format(endpoints.shuffle, this.profileId), {authorize: true, form: data})
    },
  }

module.exports = function updates(api, profileId) {
  return Object.create(proto, {
    api: {value: api, enumerable: true},
    profileId: {value: profileId, enumerable: true},
  })
}