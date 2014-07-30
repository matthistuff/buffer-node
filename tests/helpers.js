var expect = require('chai').expect,
  bufferAPI = require('../index')

describe('bufferAPI helper functions', function () {
  beforeEach(function (done) {
    this.api = bufferAPI('1/test')

    done()
  })

  describe('date helper', function () {
    it('assembles a String representation for Date objects', function (done) {
      var date = new Date()
      var helperDate = this.api.helpers.date(date)

      expect(helperDate).to.equal(date.toJSON())

      done()
    })

    it('handles strings gracefully', function (done) {
      expect(this.api.helpers.date('2014-07-29T17:08:12.229Z')).to.equal('2014-07-29T17:08:12.229Z')

      done()
    })

    it('returns an error for invalid dates', function (done) {
      var helperDate = this.api.helpers.date('wrong!')

      expect(helperDate).to.be.an.instanceOf(Error)

      done()
    })
  })

  describe('media helpers', function () {
    it('should construct a valid link object', function (done) {
      var link = this.api.helpers.link('link', 'description', 'title')

      expect(link).to.be.an('object')
      expect(link.link).to.equal('link')
      expect(link.description).to.equal('description')
      expect(link.title).to.equal('title')

      done()
    })

    it('should construct a valid picture object', function (done) {
      var picture = this.api.helpers.picture('picture', 'thumbnail')

      expect(picture).to.be.an('object')
      expect(picture.picture).to.equal('picture')
      expect(picture.thumbnail).to.equal('thumbnail')

      done()
    })

    it('should return an error when creating a picture without thumbnail', function (done) {
      var picture = this.api.helpers.picture('picture')

      expect(picture).to.be.an.instanceOf(Error)

      done()
    })
  })
})