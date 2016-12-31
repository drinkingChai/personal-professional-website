var express = require('express');
var bodyParser = require('body-parser');
var parseUrlJSON = bodyParser.json();

var Email = require('../models/email');

var router = express.Router();

router.route('/')
  .post(parseUrlJSON, function(request, response) {
    Email.new(request.body);
    response.sendStatus(201);
  });

module.exports = router;
