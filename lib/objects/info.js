var endpoints = {
    get: 'info/configuration',
  },

  proto = {
    get: function () {
      return this.api.get(endpoints.get, {authorize: true})
    },
  }

module.exports = function info(api) {
  return Object.create(proto, {api: {value: api, enumerable: true}})
}