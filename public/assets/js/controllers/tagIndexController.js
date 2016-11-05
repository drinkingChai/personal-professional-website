angular.module('ProfessionalWebsite')
  .controller('TagIndexController', function(Tag, $scope) {
    $scope.tag = new Tag();
    $scope.tags = Tag.query();
    $scope.createTag = function(tag) {
      tag.$save();
      $scope.tags = Tag.query();
      $scope.tag = new Tag();
    }
    $scope.delete = function(tag) {
      Tag.delete(tag);
      $scope.tags = Tag.query();
    }
  });
