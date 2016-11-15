angular.module('ProfessionalWebsite')
  .controller('ProjectIndexController', function(Project, Tag, $scope) {
    $scope.projects = Project.query();
    $scope.tags = Tag.query();
  });
