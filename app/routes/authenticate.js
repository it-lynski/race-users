var express = require('express')
var router = express.Router()
var User = require('../models/user') // get our mongoose model
var jwt = require('jsonwebtoken')
var config = require('./../config')

/* GET users listing. */
router.post('/', function (req, res, next) {
  console.log('In authenticate route')
  // find the user
  console.log('looking for user', req.body.name)
  User.findOne({
    name: req.body.name
  }, function (err, user) {
    if (err) {
      console.log(err.stack)
      throw err
    }

    if (!user) {
      console.log('User not found')
      return res.status(401).send({
        success: false,
        message: 'Authentication failed. User not found.'
      })
    } else if (user) {
      console.log('User found')
      // check if password matches
      if (user.password !== req.body.password) {
        console.log('Wrong password')
        return res.status(401).send({
          success: false,
          message: 'Authentication failed. Wrong password.'
        })
      } else {
        // if user is found and password is right
        // create a token
        var token = jwt.sign({ user: user.name }, config.secret)
        console.log('Token created: ', token)

        // return the information including token as JSON
        return res.status(200).send({
          success: true,
          message: 'Enjoy your token!',
          token: token
        })
      }
    }
  })
})

module.exports = router
