angular.module('ProfessionalWebsite')
  .controller('ProjectShowController', function(Project, $scope, $routeParams) {
    Project.get({title: $routeParams.title}).$promise.then(function(data) {
        $scope.project = data;
    });
  });
