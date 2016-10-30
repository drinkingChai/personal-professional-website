angular.module('ProfessionalWebsite')
  .controller('ProjectIndexController', function(Project, $scope) {
    $scope.projects = Project.query();
  });
