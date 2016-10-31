angular.module('ProfessionalWebsite')
  .factory('Project', function($http, $timeout, $q) {
    // return $resource('/projects/:name');

    var url = '/projects';
    var projectFactory = {};

    projectFactory.getAll = function() {
      var deferred = $q.defer(),
        allProjects = [];

      $timeout(function() {
        deferred.resolve($http.get(url));
      }, 200);

      deferred.promise.then(function(projects) {
        var data = projects.data;
        for (var i = 0, l = data.length; i < l; i++) {
          allProjects.push(JSON.parse(data[i]));
        }
      });

      return allProjects;
    }

    projectFactory.new = function(data) {
      return $http.post(url, data);
    }

    return projectFactory;

  });
