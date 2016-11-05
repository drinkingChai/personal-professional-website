angular.module('ProfessionalWebsite')
  .factory('Tag', function($resource) {
    return $resource('/tags/:id', {id: '@id'}, {
      update: {
        method: 'PUT'
      }
    });
  });
