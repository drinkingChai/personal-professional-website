var redis = require('redis');
var projects = require('./projects');
var client = redis.createClient();

client.select(('profWebsiteTest' || 'development').length);

var lastId = 0,
  tags = [];

//
// Parses through the redis database and
// pushes data into the tags array
// Sets lastId to the highest id of all the tags
//
client.lrange('tags', 0, -1, function(error, dbTags) {
  if (error) throw error;

  for (var i = 0, l = dbTags.length; i < l; i++) {
    var tag = JSON.parse(dbTags[i]);
    tags.push(tag);
    lastId = Math.max(lastId, tag.id);
  }
});

module.exports = {
  all: function() {
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
    client.lpush('tags', JSON.stringify(tag), function(error) { if (error) throw error; });
  },
  //
  // Delete a tag with the given Id and delete it from all projects
  // @param {Integer} id
  //
  delete: function(id) {
    var parseId = parseInt(id, 10),
      tagRemovedName;
    for (var i = 0, l = tags.length; i < l; i++) {
      if (tags[i].id === parseId) {
        tagRemovedName = tags[i].name;
        client.lrem('tags', 1, JSON.stringify(tags[i]), function(error) { if (error) throw error; });
        tags.splice(i, 1);
        break;
      }
    }
    var _projects = projects.all();
    for (var i = 0, l = _projects.length; i < l; i++) {
      if (_projects[i].hasOwnProperty("tags")) {
        delete _projects[i].tags[tagRemovedName];
        client.lset('projects', i, JSON.stringify(_projects[i]), function(error) { if (error) return error; });
      }
    }
  }
}
