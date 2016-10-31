var express = require('express');
var bodyParser = require('body-parser');
var parseUrlJSON = bodyParser.json();

var redis = require('redis');
var redisClient = redis.createClient();

redisClient.select(('profWebsiteTest' || 'development').length);

var router = express.Router();

router.route('/')
  .get(function(request, response) {
    redisClient.lrange('projects', 0, -1, function(error, data) {
      response.status(200).json(data);
    });
  })
  .post(parseUrlJSON, function(request, response) {
    var body = request.body;
    var newProject = {
      "title": body.title,
      "description": body.description
    }
    redisClient.lpush('projects', JSON.stringify(newProject), function(error) {
      if (error) throw error;
      response.status(201).json(newProject.title);
    })
  });

router.route('/:title')
  .get(function(request, response) {
    redisClient.lrange('projects', 0, -1, function(error, data) {
      if (error) throw error;

      for (var i = 0, l = data.length, title = request.params.title; i < l; i++) {
        if (JSON.parse(data[i]).title == title) response.status(200).send(data[i]);
      }
    });
  })
  .delete(function(request, response) {
    redisClient.lrange('projects', 0, -1, function(error, data) {
      if (error) throw error;

      for (var i = 0, l = data.length, title = request.params.title; i < l; i++) {
        if (JSON.parse(data[i]).title == title) {
          redisClient.lrem('projects', 1, data[i], function(error) {
            if (error) throw error;
            response.sendStatus(204);
          });
        }
      }
    });
  });

module.exports = router;
