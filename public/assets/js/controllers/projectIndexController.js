angular.module('ProfessionalWebsite')
  .controller('ProjectIndexController', function(Project, $scope, $timeout) {
    $scope.projects;
    $timeout(function() {
      Project.getAll().then(function(projects) {
        $scope.projects = projects.data;
      });
    }, 200);
  });
