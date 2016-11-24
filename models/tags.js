var redis = require('redis');
// var projects = require('./projects');
var client = redis.createClient();

var tags;

//
// Pulls tags from redis and adds them to a set
//


client.smembers("tags", function(error, data) {
  tags = new Set(data);
});


module.exports = {
  all: function() {
    return tags;
  },
  //
  // Create a new tag
  // @param {String} name
  //
  new: function(name) {
    client.sadd("tags", JSON.stringify(name));
  },
  //
  // Delete a tag
  // @param {String} name
  //
  delete: function(name) {
    client.srem("tags", JSON.stringify(name));
  }
}
