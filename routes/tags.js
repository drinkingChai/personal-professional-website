var express = require('express');
var bodyParser = require('body-parser');
var parseUrlJSON = bodyParser.json();

var Tag = require('../models/tags');

var router = express.Router();

router.route('/')
  .get(function(request, response) {
    response.status(200).json(Tag.all());
  })
  .post(parseUrlJSON, function(request, response) {
    Tag.new(request.body.name);
    response.sendStatus(201);
  });

router.route('/:name')
  .delete(function(request, response) {
    Tag.delete(request.params.name);
    response.sendStatus(204);
  });

module.exports = router;
