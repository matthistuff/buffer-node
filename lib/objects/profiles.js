var endpoints = {
    get: 'profiles',
  },

  proto = {
    get: function () {
      return this.api.get(endpoints.get, {authorize: true})
    },
  }

module.exports = function profiles(api) {
  return Object.create(proto, {api: {value: api, enumerable: true}})
}