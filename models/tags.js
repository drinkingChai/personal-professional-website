var redis = require('redis');
// var projects = require('./projects');
var client = redis.createClient();

var tags;

//
// Pulls tags from redis and adds them to a set
//


client.smembers("tags", function(error, data) {
  var tagsArray = [];
  for (var i = 0, l = data.length; i < l; i++) {
    tagsArray.push(JSON.parse(data[i]));
  }
  tagsArray.sort();
  tags = new Set(tagsArray)
});


module.exports = {
  all: function() {
    return Array.from(tags);
  },
  //
  // Create a new tag
  // @param {String} name
  //
  new: function(name) {
    tags.add(name);
    tags = new Set(Array.from(tags).sort())
    client.sadd("tags", JSON.stringify(name));
  },
  //
  // Delete a tag
  // @param {String} name
  //
  delete: function(name) {
    tags.delete(name);
    client.srem("tags", JSON.stringify(name));
  }
}
