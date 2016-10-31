angular.module('ProfessionalWebsite')
  .config(function($routeProvider) {
    $routeProvider
      .when('/projects', {
        templateUrl: 'assets/templates/projects/index.html',
        controller: "ProjectIndexController"
      })
      .when('/projects/new', {
        templateUrl: 'assets/templates/projects/new.html',
        controller: 'ProjectCreateController'
      })
      .when('/projects/:title', {
        templateUrl: 'assets/templates/projects/show.html',
        controller: 'ProjectShowController'
      });
  });
