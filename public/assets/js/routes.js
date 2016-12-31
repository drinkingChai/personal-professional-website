angular.module('ProfessionalWebsite')
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'assets/templates/home.html',
        controller: 'ProjectIndexController'
      })
      .when('/tags', {
        templateUrl: 'assets/templates/tags/index.html',
        controller: 'TagIndexController'
      })
      .when('/admin', {
        templateUrl: 'assets/templates/admin.html'
      })
      .when('/about', {
        templateUrl: 'assets/templates/about.html'
      })
      .when('/contact', {
        templateUrl: 'assets/templates/contact.html',
        controller: 'ContactController'
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
      .otherwise({
        redirectTo: '/'
      });
  });
