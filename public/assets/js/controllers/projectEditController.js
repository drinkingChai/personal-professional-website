angular.module('ProfessionalWebsite')
  .controller('ProjectEditController', function(Project, $scope, $routeParams, $location) {
    $scope.project = Project.get({id: $routeParams.id});
    $scope.saveProject = function(project) {
      project.$update()
        .then(function() {
            $location.path('/projects');
        });
    }
    $scope.delete = function(project) {
      project.$remove().then(function() {
        $location.path('/projects');
      })
    }
  });
