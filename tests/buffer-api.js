var expect = require('chai').expect,
  sinon = require('sinon'),
  bufferAPI = require('../index')

describe('bufferAPI core functions', function () {
  beforeEach(function (done) {
    this.api = bufferAPI('1/test')
    sinon.stub(this.api, 'runRequest', function (options, callback) {
      callback(null, {statusCode: 200}, JSON.stringify(options))
    })
    done()
  })

  afterEach(function (done) {
    this.api.runRequest.restore();
    done()
  })

  it('can assemble a request', function (done) {
    var request = this.api.buildRequest('get', 'test')

    expect(request).to.be.an('object')
    expect(request.method).to.equal('get')
    expect(request.url).to.equal('https://api.bufferapp.com/1/test.json')

    done()
  })

  it('can make a successful request', function (done) {
    this.api.createRequest('get', 'test').then(function (response) {
      expect(response).to.be.an('object')

      done()
    })
  })

  it('can make GET requests', function (done) {
    this.api.get('test').then(function (response) {
      expect(response.method).to.equal('get')

      done()
    })
  })

  it('can make POST requests', function (done) {
    this.api.post('test').then(function (response) {
      expect(response.method).to.equal('post')

      done()
    })
  })

  it('sends an Authorization header', function (done) {
    this.api.createRequest('get', 'test', {authorize: true}).then(function (response) {
      expect(response.headers.Authorization).to.equal('Bearer 1/test')

      done()
    })
  })

  it('returns an error for a request error', function (done) {
    this.api.runRequest.restore();
    sinon.stub(this.api, 'runRequest', function (options, callback) {
      callback(Error('This is an request error'))
    })

    this.api.createRequest('get', 'test').then(
      function () {
      },
      function (err) {
        expect(err).to.be.an.instanceof(Error)

        done()
      }
    )
  })

  it('returns an error for an http error code', function (done) {
    this.api.runRequest.restore();
    sinon.stub(this.api, 'runRequest', function (options, callback) {
      callback(null, {statusCode: 404}, JSON.stringify(
        {
          error: 'The endpoint you requested was not found.',
          code: 404
        }
      ))
    })

    this.api.createRequest('get', 'test').then(
      function () {
      },
      function (err) {
        expect(err).to.be.an.instanceof(Error)
        expect(err.httpCode).to.equal(404)
        expect(err.errorCode).to.equal(404)

        done()
      }
    )
  })
})