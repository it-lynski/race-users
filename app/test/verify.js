/* global describe it */
var chai = require('chai')
var chaiHttp = require('chai-http')

chai.use(chaiHttp)

describe('Verify', function () {
  it('should return 401 on request with no valid jwt GET', function (done) {
    chai.request('http://localhost:3000')
    .get('/verify')
    .end(function (err, res) {
      if (err) {
        console.log(err.stack)
      }
      res.should.have.status(401)
      done()
    })
  })
  it('should return 200 on request with valid jwt GET', function (done) {
    chai.request('http://localhost:3000')
    .get('/verify')
    .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYWRtaW4iLCJpYXQiOjE0ODA0MTMzNDF9.w_JdqyRZ6qRM7itm6Xp03_t5YaD4tHFh4PNgtsShHEI')
    .end(function (err, res) {
      if (err) {
        console.log(err.stack)
      }
      res.should.have.status(200)
      res.should.be.json
      res.body.should.be.a('object')
      res.body.should.have.property('user')
      res.body.user.should.have.property('user')
      res.body.user.user.should.equal('admin')
      res.body.user.should.have.property('iat')
      res.body.user.should.not.have.property('password')
      done()
    })
  })
})
