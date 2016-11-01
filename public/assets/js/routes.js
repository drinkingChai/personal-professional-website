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
      .when('/projects/:id', {
        templateUrl: 'assets/templates/projects/show.html',
        controller: 'ProjectShowController'
      })
      .when('/projects/:id/edit', {
        templateUrl: 'assets/templates/projects/edit.html',
        controller: 'ProjectEditController'
      });
  });
