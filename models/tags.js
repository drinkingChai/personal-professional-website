var redis = require('redis');
var client = redis.createClient();

client.select(('profWebsiteTest' || 'development').length);

var lastId = 0,
  tags = [];

//
// Parses through the redis database and
// pushes data into the projects array
// Sets lastId to the highest id of all the projects
//
client.lrange('tags', 0, -1, function(error, tags) {
  if (error) throw error;

  for (var i = 0, l = tags.length; i < l; i++) {
    var tag = JSON.parse(tags[i]);
    tags.push(project);
    lastId = Math.max(lastId, tags.id);
  }
});

module.exports = {
  showTags: function() {
    return tags;
  },
  //
  // Add a new tag to database
  // @param {Object} tag
  //
  new: function(tag) {
    lastId++;
    tag.id = lastId;
    tags.push(tag);
    client.lpush('projects', JSON.stringify(tag), function(error) { if (error) throw error; });
  },
  // //
  // // Returns a project with the given Id
  // // @param {Integer} id
  // //
  // get: function(id) {
  //   var parseId = parseInt(id, 10);
  //   for (var i = 0, l = projects.length; i < l; i++) {
  //     if (projects[i].id === parseId) return projects[i];
  //   }
  // },
  // //
  // // Updates a project with new data
  // // @param {Object} project
  // //
  // update: function(project) {
  //   project.id = parseInt(project.id, 10);
  //   for (var i = 0, l = projects.length; i < l; i++) {
  //     if (projects[i].id === project.id) {
  //       Object.assign(projects[i], project);
  //       client.lset('projects', i, JSON.stringify(projects[i]), function(error) { if (error) return error; });
  //       break;
  //     }
  //   }
  // },
  // //
  // // Delete a project with the given Id
  // // @param {Integer} id
  // //
  // delete: function(id) {
  //   var parseId = parseInt(id, 10);
  //   for (var i = 0, l = projects.length; i < l; i++) {
  //     if (projects[i].id === parseId) {
  //       client.lrem('projects', 1, JSON.stringify(projects[i]), function(error) { if (error) throw error; });
  //       projects.splice(i, 1);
  //       break;
  //     }
  //   }
  // }
}
