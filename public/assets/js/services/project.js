angular.module('ProfessionalWebsite')
  .factory('Project', function($http, $timeout, $q) {
    // return $resource('/projects/:name');

    var url = '/projects';
    var projectFactory = {};

    projectFactory.getAll = function() {
      var deferred = $q.defer();

      $timeout(function() {
        deferred.resolve($http.get(url));
      }, 600);

      return deferred.promise;
    }

    projectFactory.new = function(data) {
      return $http.post(url, data);
    }

    return projectFactory;

  });
