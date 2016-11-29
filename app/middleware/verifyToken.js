var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var config = require('./../config');
var User   = require('../models/user'); // get our mongoose model

/* GET users listing. */
router.use(function(req, res, next) {
  // Guard clauses
  var authorization = req.headers.authorization;
  if (!authorization || !(authorization.search('Bearer ') === 0)) {
    return res.status(401).send({
      success: false,
      message: 'Missing Authorization header or Bearer schema.'
    });
  }
  var token = authorization.split(' ')[1];

  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) {
        return res.status(401).send({
          success: false,
          message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        console.log('jwt verified: ', req.decoded);
        next();
      }
    });
  } else {

    return res.status(401).send({
      success: false,
      message: 'Missing Bearer token.'
    });

  }
});

module.exports = router;
