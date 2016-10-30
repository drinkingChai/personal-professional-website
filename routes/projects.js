var express = require('express');
var bodyParser = require('body-parser');
var parseUrlJSON = bodyParser.json();

var redis = require('redis');
var redisClient = redis.createClient();

redisClient.select(('profWebsiteTest' || 'development').length);

var router = express.Router();

router.route('/')
  .get(function(request, response) {
    redisClient.hgetall('projects', function(error, data) {
      response.status(200).json(data);
    });
  })
  .post(parseUrlJSON, function(request, response) {
    var newProject = request.body;
    redisClient.hset('projects', newProject.title, newProject.description, function(error) {
      if (error) throw error;
      response.status(201).json(newProject.title);
    })
  });

router.route('/:title')
  .get(function(request, response) {
    redisClient.hget('projects', request.params.title, function(error, data) {
      response.status(200).json(data);
    });
  })
  .delete(function(request, response) {
    redisClient.hdel('projects', request.params.title, function(error) {
      if (error) throw error;
      response.sendStatus(204);
    });
  });

module.exports = router;
