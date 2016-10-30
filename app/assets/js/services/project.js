angular.module('ProfessionalWebsite')
  .factory('Project', function($resource) {
    return $resource('/projects/:name');
  });
