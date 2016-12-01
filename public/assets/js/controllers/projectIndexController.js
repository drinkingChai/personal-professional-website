angular.module('ProfessionalWebsite')
  .controller('ProjectIndexController', function(Project, Tag, $scope) {
    $scope.projects = Project.query();
    Project.query().$promise.then(function(data) {
        $scope.firstThreeProjects = data.splice(0, 3);
    })
    $scope.tags = Tag.query();
    $scope.tagSearch = {'name': ''};
  });
