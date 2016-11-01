var express = require('express');
var bodyParser = require('body-parser');
var parseUrlJSON = bodyParser.json();

var Project = require('../models/projects');

var router = express.Router();

router.route('/')
  .get(function(request, response) {
    response.status(200).json(Project.all());
  })
  .post(parseUrlJSON, function(request, response) {
    Project.new(request.body);
    response.sendStatus(201);
  });

router.route('/:id')
  .get(function(request, response) {
    response.status(200).json(Project.get(request.params.id));
  })
  .delete(function(request, response) {
    Project.delete(request.params.id);
    response.sendStatus(204);
  })

router.route('/:id/edit')
  .put(parseUrlJSON, function(request, response) {
    request.body.id = request.params.id
    Project.update(request.body);
    response.sendStatus(200);
  });

module.exports = router;
