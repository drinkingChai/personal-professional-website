angular.module('ProfessionalWebsite')
  .controller('TagIndexController', function(Tag, $scope) {
    $scope.tag = new Tag();
    $scope.tags = Tag.query();
    $scope.createTag = function(tag) {
      tag.$save();
      console.log($scope.tags);
      $scope.tags = Tag.query();
      $scope.tag = new Tag();
    }
    $scope.delete = function(tag) {
      Tag.delete(tag);
      $scope.tags = Tag.query();
    }
  });
