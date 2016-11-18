angular.module('ProfessionalWebsite')
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'assets/templates/home.html'
      })
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
      })
      .when('/tags', {
        templateUrl: 'assets/templates/tags/index.html',
        controller: 'TagIndexController'
      })
      .when('/admin', {
        templateUrl: 'assets/templates/admin.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
