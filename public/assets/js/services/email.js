angular.module('ProfessionalWebsite')
  .factory('Email', function($resource) {
    return $resource('/email');
  });
