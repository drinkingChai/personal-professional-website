angular.module('ProfessionalWebsite')
  .controller('ProjectEditController', function(Project, $scope, $routeParams, $location) {
    $scope.project = new Project;
    Project.get({title: $routeParams.title}).$promise.then(function(data) {
      Object.assign($scope.project, data);
    });

    $scope.saveProject = function(project) {
      project.$update().then(function() {
        $location.path('/projects');
      });
    }
  });
