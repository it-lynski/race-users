var express = require('express')
var router = express.Router()
var User = require('../models/user') // get our mongoose model

/* GET users listing. */
router.get('/', function (req, res, next) {
  User.find({}, function (err, users) {
    if (err) {
      console.log(err.stack)
    }
    res.json(users)
  })
})

/* GET user by name. */
router.get('/:name', function (req, res) {
  User.findOne({ 'name': req.params.name }, function (err, user) {
    if (err) {
      throw err
    }
    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'User not found.'
      })
    }
    console.log('User found: ', user)
    res.json(user)
  })
})

/* GET user by name. */
router.post('/', function (req, res, next) {
  console.log('Creating new user', req.body)
  // Initialize an admin user
  var user = new User({
    name: req.body.name,
    password: req.body.password,
    admin: req.body.admin
  })

  // save the sample user
  user.save(function (err) {
    if (err) {
      console.log('Caught errror: ', err.name, err.code)
      // check for duplicate key error
      if (err.code === 11000) {
        console.log('Duplicate key error')
        return res.status(409).send({
          success: false,
          message: 'Duplicate user.'
        })
      } else {
        // A general error (db, crypto, etc…)
        console.log('Caught errror: ', err.name)
        return next(err)
      }
    }
    console.log('User saved successfully')
    return res.status(201)
    .header('location', 'somelocation')
    .send()
  })
})

module.exports = router
