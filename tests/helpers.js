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
})