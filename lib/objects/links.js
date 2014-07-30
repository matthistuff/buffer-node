var endpoints = {
    get: 'links/shares',
  },

  proto = {
    shares: function (url) {
      return this.api.get(endpoints.get, {qs: {url: url}})
    },
  }

module.exports = function shares(api) {
  return Object.create(proto, {api: {value: api, enumerable: true}})
}