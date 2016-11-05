angular.module('ProfessionalWebsite')
  .factory('Project', function($resource) {
    return $resource('/projects/:id', {id: '@id'}, {
      update: {
        method: 'PUT'
      }
    });
  });
