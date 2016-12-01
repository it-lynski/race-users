var express = require('express')
var router = express.Router()
var User = require('../models/user') // get our mongoose model
var jwt = require('jsonwebtoken')
var config = require('./../config')

/* GET users listing. */
router.post('/', function (req, res, next) {
  // find the user
  User.findOne({
    name: req.body.name
  }, function (err, user) {
    if (err) throw err

    if (!user) {
      return res.status(401).send({
        success: false,
        message: 'Authentication failed. User not found.'
      })
    } else if (user) {
      // check if password matches
      if (user.password !== req.body.password) {
        return res.status(401).send({
          success: false,
          message: 'Authentication failed. Wrong password.'
        })
      } else {
        // if user is found and password is right
        // create a token
        var token = jwt.sign({ user: user.name }, config.secret)

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
