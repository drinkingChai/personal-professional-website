angular.module('ProfessionalWebsite')
  .controller('ProjectShowController', function(Project, $scope, $routeParams, $location) {
    $scope.project = Project.get({id: $routeParams.id});

    $scope.delete = function(project) {
      project.$remove().then(function() {
        $location.path('/projects');
      })
    }
  });
