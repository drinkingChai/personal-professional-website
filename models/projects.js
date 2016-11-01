var redis = require('redis');
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
    note.id = lastId;
    projects.push(note);
    client.lpush('projects', note, function(error) { if (error) throw error; });
  },
  //
  // Returns a project with the given Id
  // @param {Integer} id
  //
  get: function(id) {
    for (var i = 0, l = projects.length; i < l; i++) {
      if (projects[i].id === id) return projects[i];
    }
  },
  //
  // Updates a project with new data
  // @param {Object} project
  //
  update: function(project) {
    for (var i = 0, l = projects.length; i < l; i++) {
      if (projects[i].id === id) {
        Object.assign(projects[i], project);
        client.lset('projects', i, JSON.stringify(project), function(error) { if (error) return error; });
        break;
      }
    }
  },
  //
  // Delete a project with the given Id
  // @param {Integer} id
  //
  delete: function(id) {
    for (var i = 0, l = projects.length; i < l; i++) {
      if (projects[i].id === id) {
        projects.splice(i, 1);
        redisClient.lrem('projects', 1, data[i], function(error) { if (error) throw error; });
        break;
      }
    }
  }
}
