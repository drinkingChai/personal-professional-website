angular.module('ProfessionalWebsite')
  .filter('tagFilter', function() {
    return function(collection, input) {
      var newCollection = [];

      if (input) {
        for (var i = 0, l = collection.length; i < l; i++) {
          if (collection[i].tags.indexOf(input) !== -1) {
            newCollection.push(collection[i]);
          }
        }
        return newCollection;
      } else {
        return collection;
      }
    }
  });
