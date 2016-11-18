angular.module('ProfessionalWebsite')
  .filter('tagFilter', function() {
    return function(collection, input) {
      var newCollection = [];

      if (input) {
        for (var i = 0, l = collection.length; i < l; i++) {
          for (var j = 0, tags = Object.keys(collection[i].tags), n = tags.length; j < n; j++) {
            if (tags[j].includes(input.$)) {
              newCollection.push(collection[i]);
              break;
            }
          }
        }
        return newCollection;
      } else {
        return collection;
      }
    }
  });
