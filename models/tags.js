var redis = require('redis');
var client = redis.createClient();

client.select(('profWebsiteTest' || 'development').length);

var lastId = 0,
  tags = [];

//
// Parses through the redis database and
// pushes data into the tags array
// Sets lastId to the highest id of all the tags
//
client.lrange('tags', 0, -1, function(error, tags) {
  if (error) throw error;

  for (var i = 0, l = tags.length; i < l; i++) {
    var tag = JSON.parse(tags[i]);
    tags.push(tag);
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
  newTag: function(tag) {
    lastId++;
    tag.id = lastId;
    tags.push(tag);
    client.lpush('tags', JSON.stringify(tag), function(error) { if (error) throw error; });
  },
  //
  // Returns a tag with the given Id
  // @param {Integer} id
  //
  getTag: function(id) {
    var parseId = parseInt(id, 10);
    for (var i = 0, l = tags.length; i < l; i++) {
      if (tags[i].id === parseId) return tags[i];
    }
  },
  //
  // Delete a tag with the given Id
  // @param {Integer} id
  //
  deleteTag: function(id) {
    var parseId = parseInt(id, 10);
    for (var i = 0, l = tags.length; i < l; i++) {
      if (tags[i].id === parseId) {
        client.lrem('tags', 1, JSON.stringify(tags[i]), function(error) { if (error) throw error; });
        tags.splice(i, 1);
        break;
      }
    }
  }
  //
  // Updates a tag with new data
  // @param {Object} tag
  //
  update: function(tag) {
    tag.id = parseInt(tag.id, 10);
    for (var i = 0, l = tags.length; i < l; i++) {
      if (tags[i].id === tag.id) {
        Object.assign(tags[i], tag);
        client.lset('tags', i, JSON.stringify(tags[i]), function(error) { if (error) return error; });
        break;
      }
    }
  },
}
