angular.module('ProfessionalWebsite')
  .factory('Project', function($resource, $http, $timeout, $q) {
    return $resource('/projects/:title', {}, {
      query: {
        method: 'GET',
        isArray: true,
        transformResponse: function(response) {
          var allProjects = [],
            res = JSON.parse(response);

          for (var i = 0, l = res.length; i < l; i++) {
            allProjects.push(JSON.parse(res[i]));
          }

          return allProjects;
        }
      },
      update: {
        method: 'PUT'
      }
    });

    // var url = '/projects';
    // var projectFactory = {};
    //
    // projectFactory.getAll = function() {
    //   var deferred = $q.defer(),
    //     allProjects = [];
    //
    //
    //   $timeout(function() {
    //     deferred.resolve($http.get(url));
    //   }, 200);
    //
    //   deferred.promise.then(function(projects) {
    //     var data = projects.data;
    //     for (var i = 0, l = data.length; i < l; i++) {
    //       allProjects.push(JSON.parse(data[i]));
    //     }
    //   });
    //
    //   return allProjects;
    // }
    //
    // projectFactory.new = function(data) {
    //   return $http.post(url, data);
    // }
    //
    // return projectFactory;

  });
