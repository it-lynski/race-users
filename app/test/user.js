/* eslint-env chai, mocha */
/* eslint-disable no-unused-vars */

var chai = require('chai')
var chaiHttp = require('chai-http')
var should = chai.should()
var TestUser = require('../models/user')

chai.use(chaiHttp)

describe('Users', function () {
  before(function () {
    // runs before all tests in this block
    console.log('Before')
    // Do some development specific set up:
    // =======
    // Initializ  e an test user
    var test = new TestUser({
      name: 'test',
      password: 'test',
      test: true
    })

    // save the sample user
    test.save(function (err) {
      if (err) {
        // check for duplicate key error
        if (err.code === 11000) {
          ;
        } else {
          // A general error (db, crypto, etc…)
          throw err
        }
      } else {
        console.log('User saved successfully')
      }
    })
  })
  after(function () {
    console.log('After')
    TestUser.findOne({'name': 'test'}, function (err, users) {
      if (err) {
        console.log('Err', err)
      } else {
        console.log('Removed!')
      }
    })
  })
  it('should return 401 on request with no valid jwt', function (done) {
    chai.request('http://localhost:3000')
    .get('/users')
    .end(function (err, res) {
      if (err) {
        // console.log(err.stack)
      }
      res.should.have.status(401)
      done()
    })
  })
  it('should list ALL users on /users GET', function (done) {
    chai.request('http://localhost:3000')
    .get('/users')
    .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYWRtaW4iLCJpYXQiOjE0ODA0MTMzNDF9.w_JdqyRZ6qRM7itm6Xp03_t5YaD4tHFh4PNgtsShHEI')
    .end(function (err, res) {
      if (err) {
        // console.log(err.stack)
      }
      res.should.have.status(200)
      res.should.be.json
      res.body.should.be.a('array')
      done()
    })
  })
  it('should list a SINGLE user on /user/<name> GET', function (done) {
    chai.request('http://localhost:3000')
    .get('/users/test')
    .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYWRtaW4iLCJpYXQiOjE0ODA0MTMzNDF9.w_JdqyRZ6qRM7itm6Xp03_t5YaD4tHFh4PNgtsShHEI')
    .end(function (err, res) {
      if (err) {
        console.log(err.stack)
      }
      res.should.have.status(200)
      res.should.be.json
      res.body.should.be.a('object')
      res.body.should.have.property('name')
      res.body.should.have.property('_id')
      res.body.name.should.equal('test')
      res.body.should.have.property('password')
      res.body.should.have.property('test')
      done()
    })
  })
  it('should add a SINGLE user on /users POST', function (done) {
    chai.request('http://localhost:3000')
    .post('/users')
    .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYWRtaW4iLCJpYXQiOjE0ODA0MTMzNDF9.w_JdqyRZ6qRM7itm6Xp03_t5YaD4tHFh4PNgtsShHEI')
    .send({ name: 'test15', password: 'test' })
    .end(function (err, res) {
      if (err) {
        console.log(err.stack)
      }
      res.should.have.status(201)
      res.should.have.header('location')
      done()
    })
  })
  it('should update a SINGLE blob on /blob/<id> PUT')
  it('should delete a SINGLE blob on /blob/<id> DELETE')
})
