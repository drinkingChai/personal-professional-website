angular.module('ProfessionalWebsite')
  .factory('Project', function($resource, $http, $timeout, $q) {
    return $resource('/projects/:id', {id: '@id'}, {
      update: {
        method: 'PUT'
      }
    });
  });
