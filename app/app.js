var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var jwt = require('jsonwebtoken');
var config = require('./config');
var User = require('./models/user');

var index = require('./routes/index');
var users = require('./routes/users');
var authenticate = require('./routes/authenticate');

var app = express();

// use morgan to log requests to the console
app.use(logger('dev'));

// ===================
// configuration
// ===================
console.log('config', config.database);
app.set('superSecret', config.secret);
mongoose.connect(config.database);

// =======
// Initialize an admin user
var admin = new User({
  name: 'admin',
  password: 'admin',
  admin: true
});

// save the sample user
admin.save(function(err) {
  if (err) throw err;

  console.log('User saved successfully');
});

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/authenticate', authenticate);

module.exports = app;
