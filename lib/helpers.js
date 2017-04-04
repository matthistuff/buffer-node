var isDate = require('lodash.isdate'),

  proto = {
    date: function (date) {
      if (!isDate(date)) {
        date = new Date(date)
      }

      if (isNaN(date.getTime())) {
        return new Error('Supplied argument is not parsable by Date!')
      }

      return date.toJSON()
    },

    link: function (link, description, title) {
      var data = {}
      if (link) {
        data.link = link
      }
      if (description) {
        data.description = description
      }
      if (title) {
        data.title = title
      }

      return data
    },

    picture: function (picture, thumbnail) {
      if (picture && !thumbnail) {
        return new Error('Image based updates require both the picture and the thumbnail parameter!')
      }

      return {
        picture: picture,
        thumbnail: thumbnail,
      }
    },
  }

module.exports = function helpers() {
  return Object.create(proto)
}