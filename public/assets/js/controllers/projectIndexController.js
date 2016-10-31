angular.module('ProfessionalWebsite')
  .controller('ProjectIndexController', function(Project, $scope) {
    // $scope.projects = Project.getAll();
    // $scope.projects.$promise.then(function(data) {
    //
    //   console.log(data);
    // });

    Project.query().$promise.then(function(data) {
      $scope.projects = data;
    });

    $scope.delete = function(project) {
      Project.delete(project.title);
      // console.log(project.title);
    }
  });
