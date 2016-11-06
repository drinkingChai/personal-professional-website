angular.module('ProfessionalWebsite')
  .controller('ProjectCreateController', function(Project, Tag, $scope, $location) {
    $scope.project = new Project();
    $scope.tag = new Tag();
    $scope.tags = Tag.query();
    $scope.createTag = function(tag) {
      tag.$save();
      $scope.tags.append(tag);
      $scope.tag = new Tag();
    }
    $scope.saveProject = function(project) {
      project.$save();
      $location.path('/projects');
    }
  });
