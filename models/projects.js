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
    var parseId = parseInt(id, 10);
    for (var i = 0, l = projects.length; i < l; i++) {
      if (projects[i].id === parseId) return projects[i];
    }
  },
  //
  // Updates a project with new data
  // @param {Object} project
  //
  update: function(project) {
    project.id = parseInt(project.id, 10);
    for (var i = 0, l = projects.length; i < l; i++) {
      if (projects[i].id === project.id) {
        Object.assign(projects[i], project);
        client.lset('projects', i, JSON.stringify(projects[i]), function(error) { if (error) return error; });
        break;
      }
    }
  },
  //
  // Delete a project with the given Id
  // @param {Integer} id
  //
  delete: function(id) {
    var parseId = parseInt(id, 10);
    for (var i = 0, l = projects.length; i < l; i++) {
      if (projects[i].id === parseId) {
        client.lrem('projects', 1, JSON.stringify(projects[i]), function(error) { if (error) throw error; });
        projects.splice(i, 1);
        break;
      }
    }
  },
  //
  // Add a tag to the given project
  // @param {Object} project
  // @param {Object} tag
  //
  addTag: function(project, tag) {
    var parseTagId = parseInt(tag.id, 10);
    var parseId = parseInt(project.id, 10);
    for (var i = 0, l = projects.length; i < l; i++) {
      if (projects[i].id === project.id) {
        projects.tags.push(parseTagId);
        Object.assign(projects[i], project);
        client.lset('projects', i, JSON.stringify(projects[i]), function(error) { if (error) return error; });
        break;
      }
    }
  },
  //
  // Remove a tag to the given project
  // @param {Object} project
  // @param {Object} tag
  //
  removeTag: function(project, tag) {
    var parseTagId = parseInt(tag.id, 10);
    var parseId = parseInt(project.id, 10);
    for (var i = 0, l = projects.length; i < l; i++) {
      if (projects[i].id === project.id) {
        var projectTags = project[i].tags,
          tagIndex = projectTags.indexOf(parseTagId);
        if (tagIndex) {
          tags.splice(tagIndex, 1);
          Object.assign(projects[i], project);
          client.lset('projects', i, JSON.stringify(projects[i]), function(error) { if (error) return error; });
        }
        break;
      }
    }
  },
  //
  // Checks if project has the given tags
  // @param {Object} project
  // @param {Array of Objects} tags
  //
  matchTags: function(project, tags) {
    var parseId = parseInt(project.id, 10),
      parseTags = JSON.parse(tags).map(function(obj) { return obj.id; }),
      matched = [];
    for (var i = 0, l = projects.length; i < l; i++) {
      if (projects[i].id === project.id &&
        _.difference(parseTags, projects[i].tags).length === 0) {
          matched.push(project[i]);
      }
    }
    return matched;
  }
  //
  // Checks if project has the given categories
  // @param {Object} project
  // @param {Array} tags
  //
  // matchCategories: function(project, categories) {
  //
  // }
}
