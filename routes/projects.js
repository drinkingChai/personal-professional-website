var express = require('express');
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({ extended: false });

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
  .post(parseUrlencoded, function(request, response) {
    var newProject = request.body;
    redisClient.hset('projects', newProject.name, newProject.description, function(error) {
      if (error) throw error;
      response.status(201).json(newProject.name);
    })
  });

router.route('/:name')
  .get(function(request, response) {
    redisClient.hget('projects', request.params.name, function(error, data) {
      response.status(200).json(data);
    });
  })
  .delete(function(request, response) {
    redisClient.hdel('projects', request.params.name, function(error) {
      if (error) throw error;
      response.sendStatus(204);
    });
  });

module.exports = router;
