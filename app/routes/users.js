var express = require('express');
var router = express.Router();
var User   = require('../models/user'); // get our mongoose model

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find({}, function(err, users) {
    res.json(users);
  });
});

module.exports = router;
