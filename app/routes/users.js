var express = require('express');
var router = express.Router();
var User   = require('../models/user'); // get our mongoose model

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find({}, function(err, users) {
    res.json(users);
  });
});

/* GET user by name. */
router.get('/:name', function (req, res) {
  name = req.params.name;
  User.findOne({ 'name': req.params.name }, function(err, user) {
    if (err) {
      return res.status(500).send({
        success: false,
        message: 'User not found.'
      });

    }
    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'User not found.'
      });

    }
    console.log('User found: ', user);
    res.json(user);
  });
});

module.exports = router;
