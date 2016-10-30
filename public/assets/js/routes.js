angular.module('ProfessionalWebsite')
  .config(function($routeProvider) {
    $routeProvider
      .when('/projects', {
        controller: "ProjectIndexController"
      });
  });
