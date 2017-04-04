var util = require('util'),
  assign = require('lodash.assign'),
  pick = require('lodash.pick'),

  interactions = require('./interactions'),

  endpoints = {
    get: 'updates/%s',
    update: 'updates/%s/update',
    share: 'updates/%s/share',
    destroy: 'updates/%s/destroy',
    moveToTop: 'updates/%s/move_to_top',
    interactions: 'updates/%s/interactions',
  },

  proto = {
    get: function () {
      return this.api.get(util.format(endpoints.get, this.id), {authorize: true})
    },

    update: function (text, options) {
      var data = {
        text: text,
      }

      if (options) {
        assign(data, pick(options, ['now', 'media', 'utc', 'scheduled_at']))
      }

      if (data.scheduled_at) {
        data.scheduled_at = this.api.helpers.date(data.scheduled_at)
      }

      return this.api.post(util.format(endpoints.update, this.id), {authorize: true, form: data})
    },

    share: function () {
      return this.api.post(util.format(endpoints.share, this.id), {authorize: true})
    },

    destroy: function () {
      return this.api.post(util.format(endpoints.destroy, this.id), {authorize: true})
    },

    moveToTop: function () {
      return this.api.post(util.format(endpoints.moveToTop, this.id), {authorize: true})
    },

    interactions: function (event, options) {
      var data = {
        event: event
      }

      if (options) {
        assign(data, pick(options, ['count', 'page']))
      }

      return this.api.get(util.format(endpoints.interactions, this.id), {authorize: true, qs: data})
    }
  }

module.exports = function update(api, id) {
  return Object.create(proto, {
    api: {value: api, enumerable: true},
    id: {value: id, enumerable: true},
    interactions: {value: interactions(api, id), enumerable: true},
  })
}