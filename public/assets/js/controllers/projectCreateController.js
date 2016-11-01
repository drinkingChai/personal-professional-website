angular.module('ProfessionalWebsite')
  .controller('ProjectCreateController', function(Project, $scope, $location) {
    $scope.project = new Project();
    $scope.saveProject = function(project) {
      project.$save();
      $location.path('/projects');
    }
  });
