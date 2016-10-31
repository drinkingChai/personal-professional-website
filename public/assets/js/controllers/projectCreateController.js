angular.module('ProfessionalWebsite')
  .controller('ProjectCreateController', function(Project, $scope) {
    $scope.project = {};
    $scope.saveProject = function(project) {
      Project.new(project);
    }
  });
