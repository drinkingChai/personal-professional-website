angular.module('ProfessionalWebsite')
  .controller('ProjectIndexController', function(Project, Tag, $scope) {
    $scope.projects = Project.query();
    Project.query().$promise.then(function(data) {
      $scope.doubleColumnProjects = [];
      var temp = [];

      for (var i = 0, l = data.length; i < l; i++) {
        temp.push(data[i]);
        if (temp.length === 2 || i + 1 == l) {
          $scope.doubleColumnProjects.push(temp);
          temp = [];
        }
      }
    })
    $scope.tags = Tag.query();
    $scope.tagSearch = {'name': ''};
  });
