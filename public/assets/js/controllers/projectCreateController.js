angular.module('ProfessionalWebsite')
  .controller('ProjectCreateController', function(Project, $scope) {
    $scope.project = new Project();
    $scope.saveProject = function(project) {
      project.$save();
    }
  });
