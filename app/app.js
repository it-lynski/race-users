var express = require('express')
var path = require('path')
var logger = require('morgan')
var bodyParser = require('body-parser')

var User = require('./models/user')

var index = require('./routes/index')
var users = require('./routes/users')
var authenticate = require('./routes/authenticate')
var verify = require('./routes/verify')

var verifyToken = require('./middleware/verifyToken')

var app = express()

// use morgan to log requests to the console
app.use(logger('dev'))

// ===================
// configuration
// ===================
var env = process.env.NODE_ENV || 'development'
if (env === 'development') {
  var config = require('./config_development')
} else {
  config = require('./config')
}
console.log('env:', env)
console.log('config', config.database)

var mongoose = require('mongoose')
mongoose.Promise = global.Promise

if (env === 'development') {
  // Do some development specific set up:
  var mockgoose = require('mockgoose')
  mockgoose(mongoose).then(function () {
    // mongoose connection
    mongoose.connect(config.database)
  })
} else {
  mongoose.connect(config.database)
}
// =======
// Initialize an admin user
var admin = new User({
  name: 'admin',
  password: 'admin',
  admin: true
})

// save the sample user
admin.save(function (err) {
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

app.set('superSecret', config.secret)

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

// API ROUTES ---------------------------------

// Unprotected routes:
app.use('/', index)
app.use('/authenticate', authenticate)
// Middleware to verify jwt
app.use(verifyToken)
// Protected routes:
app.use('/verify', verify)
app.use('/users', users)

module.exports = app
