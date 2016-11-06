var _ = require('lodash');
var redis = require('redis');
var tags = require('./tags');
var client = redis.createClient();

client.select(('profWebsiteTest' || 'development').length);

var lastId = 0,
  projects = [];

//
// Parses through the redis database and
// pushes data into the projects array
// Sets lastId to the highest id of all the projects
//
client.lrange('projects', 0, -1, function(error, data) {
  if (error) throw error;

  for (var i = 0, l = data.length; i < l; i++) {
    var project = JSON.parse(data[i]);
    projects.push(project);
    lastId = Math.max(lastId, project.id);
  }
});

var searchById = function(id) {
  var parseId = parseInt(id, 10);
  for (var i = 0, l = projects.length; i < l; i++) {
    if (projects[i].id === parseId) {
      return {value: projects[i], index: i};
    }
  }
}

module.exports = {
  all: function() {
    return projects;
  },
  //
  // Save project to database
  // @param {Object} project
  //
  new: function(project) {
    lastId++;
    project.id = lastId;
    projects.push(project);
    client.lpush('projects', JSON.stringify(project), function(error) { if (error) throw error; });
  },
  //
  // Returns a project with the given Id
  // @param {Integer} id
  //
  get: function(id) {
    return searchById(id).value;
  },
  //
  // Updates a project with new data
  // @param {Object} project
  //
  update: function(project) {
    project.id = parseInt(project.id, 10)
    var _project = searchById(project.id);
    Object.assign(_project.value, project);
    client.lset('projects', _project.index, JSON.stringify(_project.value), function(error) { if (error) return error; });
  },
  //
  // Delete a project with the given Id
  // @param {Integer} id
  //
  delete: function(id) {
    var _project = searchById(id);
    client.lrem('projects', 1, JSON.stringify(_project.value), function(error) { if (error) throw error; });
    projects.splice(_project.i, 1);
  }
}
