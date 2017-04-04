var util = require('util'),
  assign = require('lodash.assign'),
  pick = require('lodash.pick'),

  endpoints = {
    pending: 'profiles/%s/updates/pending',
    sent: 'profiles/%s/updates/sent',
    reorder: 'profiles/%s/updates/reorder',
    shuffle: 'profiles/%s/updates/shuffle',
  },

  proto = {
    pending: function (options) {
      var data = pick(options, ['page', 'count', 'since', 'utc'])

      if (data.since) {
        data.since = this.api.helpers.date(data.since)
      }

      return this.api.get(util.format(endpoints.pending, this.profileId), {authorize: true, qs: data})
    },

    sent: function (options) {
      var data = pick(options, ['page', 'count', 'since', 'utc'])

      if (data.since) {
        data.since = this.api.helpers.date(data.since)
      }

      return this.api.get(util.format(endpoints.sent, this.profileId), {authorize: true, qs: data})
    },

    reorder: function (order, options) {
      var data = {
        order: order,
      }

      if (options) {
        assign(data, pick(options, ['offset', 'utc']))
      }

      return this.api.post(util.format(endpoints.reorder, this.profileId), {authorize: true, form: data})
    },

    shuffle: function (options) {
      var data = {}

      if (options) {
        assign(data, pick(options, ['count', 'utc']))
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