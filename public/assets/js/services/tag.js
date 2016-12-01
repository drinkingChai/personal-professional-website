angular.module('ProfessionalWebsite')
  .factory('Tag', function($resource) {
    return $resource('/tags/:name', {id: '@name'});
  });
