var express = require('express');
var bodyParser = require('body-parser');
var parseUrlJSON = bodyParser.json();

var Project = require('../models/projects');

var router = express.Router();

router.route('/')
  .get(function(request, response) {
    response.status(200).json(Project.all());
  })
  .post(function(request, response) {
    response.sendStatus(201);
  });

router.route('/:id')
  .get(function(request, response) {
    response.sendStatus(200);
  })
  .delete(function(request, response) {
    response.sendStatus(204);
  })

router.route('/:id/edit')
  .put(parseUrlJSON, function(request, response) {
    response.sendStatus(200);
  });

module.exports = router;







//
// router.route('/')
//   .get(function(request, response) {
//     redisClient.lrange('projects', 0, -1, function(error, data) {
//       response.status(200).json(data);
//     });
//   })
//   .post(parseUrlJSON, function(request, response) {
//     var body = request.body;
//     var newProject = {
//       "title": body.title,
//       "description": body.description
//     }
//     redisClient.lpush('projects', JSON.stringify(newProject), function(error) {
//       if (error) throw error;
//       response.status(201);
//     })
//   });
//
// router.route('/:title')
//   .get(function(request, response) {
//     redisClient.lrange('projects', 0, -1, function(error, data) {
//       if (error) throw error;
//
//       for (var i = 0, l = data.length, title = request.params.title; i < l; i++) {
//         if (JSON.parse(data[i]).title == title) response.status(200).send(data[i]);
//       }
//     });
//   })
//   .delete(function(request, response) {
//     redisClient.lrange('projects', 0, -1, function(error, data) {
//       if (error) throw error;
//
//       for (var i = 0, l = data.length, title = request.params.title; i < l; i++) {
//         if (JSON.parse(data[i]).title == title) {
//           redisClient.lrem('projects', 1, data[i], function(error) {
//             if (error) throw error;
//             response.sendStatus(204);
//           });
//         }
//       }
//     });
//   });
//
// router.route('/:title/edit')
//   .put(parseUrlJSON, function(request, response) {
//     redisClient.lrange('projects', 0, -1, function(error, data) {
//       if (error) throw error;
//
//       // search through redis for object matching title
//       // if matches, update the index with the new object
//       for (var i = 0, l = data.length, title = request.params.title; i < l; i++) {
//         if (JSON.parse(data[i]).title == title) {
//           redisClient.lset('projects', i, JSON.stringify(request.body), function(error) {
//             if (error) throw error;
//             response.sendStatus(200);
//           });
//         }
//       }
//     });
//   });
