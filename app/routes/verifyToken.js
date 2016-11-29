var express = require('express');
var router = express.Router();
var User   = require('../models/user'); // get our mongoose model

/* GET users listing. */
router.use(function(req, res, next) {
  // Guard clauses
  var authorization = req.headers.authorization;
  if (!authorization || !(authorization.search('Bearer ') === 0)) {
    return res.status(401).send({
      success: false,
      message: 'Missing Authorization header.'
    });
  }
  var token = authorization.split(' ')[1];
  if (!token) {
    return res.status(401).send({
      success: false,
      message: 'Missing Bearer token.'
    });
  }

  console.log('jwt verified');
  next();
});

module.exports = router;
