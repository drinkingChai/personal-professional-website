angular.module('ProfessionalWebsite')
  .controller('ProjectEditController', function(Project, Tag, $scope, $routeParams, $location) {
    $scope.project = Project.get({id: $routeParams.id});
    $scope.tag = new Tag();
    $scope.tags = Tag.query();
    $scope.createTag = function(tag) {
      tag.$save();
      $scope.tags = Tag.query();
      $scope.tag = new Tag();
    }
    $scope.saveProject = function(project) {
      project.$update()
        .then(function() {
            $location.path('/projects');
        });
    }
  });
