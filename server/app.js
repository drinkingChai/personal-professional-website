var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({ extended: false });

var redis = require('redis');
var redisClient = redis.createClient();

redisClient.select(('profWebsiteTest' || 'development').length);


app.get('/projects', function(request, response) {
  redisClient.hget('projects', function(error, data) {
    response.status(200).json(data);
  });
});

app.post('/projects', parseUrlencoded, function(request, response) {
  var newProject = request.body;
  redisClient.hset('projects', newProject.name, newProject.description, function(error) {
    if (error) throw error;
    response.status(201).json(newProject.name);
  })
});

app.get('/projects/:name', function(request, response) {
  redisClient.hget('projects', request.params.name, function(error, data) {
    response.status(200).json(data);
  });
});

app.delete('/projects/:name', function(request, response) {
  redisClient.hdel('projects', request.params.name, function(error) {
    if (error) throw error;
    response.sendStatus(204);
  });
});

module.exports = app;
