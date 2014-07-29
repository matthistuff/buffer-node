var endpoints = {
    get: 'user',
  },

  proto = {
    get: function () {
      return this.api.get(endpoints.get, {authorize: true})
    },
  }

module.exports = function user(api) {
  return Object.create(proto, {api: {value: api, enumerable: true}})
}