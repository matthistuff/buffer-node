var isArray = require('lodash.isarray'),
  assign = require('lodash.assign'),
  pick = require('lodash.pick'),

  endpoints = {
    create: 'updates/create',
  },

  proto = {
    create: function (text, profileIds, options) {
      if (!isArray(profileIds)) {
        profileIds = [profileIds]
      }

      var data = {
        text: text,
        profile_ids: profileIds
      }

      if (options) {
        assign(data, pick(options, ['shorten', 'now', 'top', 'media', 'attachment', 'scheduled_at']))
      }

      if (data.scheduled_at) {
        data.scheduled_at = this.api.helpers.date(data.scheduled_at)
      }

      return this.api.post(endpoints.create, {authorize: true, form: data})
    },
  }

module.exports = function update(api) {
  return Object.create(proto, {
    api: {value: api, enumerable: true},
  })
}