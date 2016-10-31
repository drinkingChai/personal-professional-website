angular.module('ProfessionalWebsite')
  .controller('ProjectCreateController', function(Project, $scope) {
    // $scope.project = {};
    // $scope.saveProject = function(project) {
    //   Project.new(project);
    // }
    $scope.project = new Project();
    $scope.saveProject = function(project) {
      project.$save();
    }
  });
