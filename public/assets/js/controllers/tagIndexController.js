angular.module('ProfessionalWebsite')
  .controller('TagIndexController', function(Tag, $scope, $routeParams) {
    $scope.tag = new Tag();
    $scope.tags = Tag.query();
    $scope.createTag = function(tag) {
      tag.$save();
      $scope.tags = Tag.query();
      $scope.tag = new Tag();
    }
    $scope.delete = function(tagName) {
      Tag.delete({name: tagName});
      $scope.tags = Tag.query();
    }
  });
