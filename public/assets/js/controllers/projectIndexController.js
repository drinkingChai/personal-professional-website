angular.module('ProfessionalWebsite')
  .controller('ProjectIndexController', function(Project, $scope) {
    $scope.projects = Project.get();

    $scope.test = function() {
      console.log($scope.projects);
    }
  });
