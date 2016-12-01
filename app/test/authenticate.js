/* eslint-env node, mocha */
/* eslint-disable no-unused-vars */

var chai = require('chai')
var chaiHttp = require('chai-http')
var should = chai.should()

chai.use(chaiHttp)

describe('Authenticate', function () {
  it('should not authenticate an unknown user /authorize POST', function (done) {
    chai.request('http://localhost:3000')
    .post('/authenticate')
    .send({ name: 'unknown', password: 'admin' })
    .end(function (err, res) {
      if (err) {
        // console.log(err.stack)
      }
      res.should.have.status(401)
      done()
    })
  })
  it('should not authenticate existing user with wrong password /authorize POST', function (done) {
    chai.request('http://localhost:3000')
    .post('/authenticate')
    .send({ name: 'admin', password: 'wrongpassword' })
    .end(function (err, res) {
      if (err) {
        // console.log(err.stack)
      }
      res.should.have.status(401)
      done()
    })
  })
  it('should authenticate an existing user with correct password /authorize POST', function (done) {
    chai.request('http://localhost:3000')
    .post('/authenticate')
    .send({ name: 'admin', password: 'admin' })
    .end(function (err, res) {
      if (err) {
        // console.log(err.stack)
      }
      res.should.have.status(200)
      res.should.be.json
      res.should.be.json
      res.body.should.be.a('object')
      res.body.should.have.property('token')
      done()
    })
  })
})
