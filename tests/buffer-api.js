var expect = require('chai').expect,
  sinon = require('sinon'),
  bufferAPI = require('../index')

describe('bufferAPI', function () {
  before(function (done) {
    this.api = bufferAPI('1/test')
    sinon.stub(this.api, 'runRequest').callsArgWith(1, null, {statusCode: 200}, JSON.stringify({success: true}))
    done()
  })

  after(function (done) {
    this.api.runRequest.restore();
    done()
  })

  describe('core functions', function () {
    it('can assemble a request', function (done) {
      var request = this.api.buildRequest('get', 'test')

      expect(request).to.be.an('object')
      expect(request.method).to.equal('get')
      expect(request.url).to.equal('https://api.bufferapp.com/1/test.json')

      done()
    })

    it('can run a request', function (done) {
      this.api.createRequest('get', 'test').then(function (response) {
        expect(response).to.be.an('object')
        expect(response.success).to.be.true
        done()
      })
    })
  })
})