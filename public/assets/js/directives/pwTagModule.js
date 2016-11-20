angular.module('ProfessionalWebsite')
  .directive('pwTagModule', function(Tag) {
    return {
      replace: true,
      restrict: "E",
      templateUrl: "assets/templates/directives/pwTagModule.html",
      scope: {
        project: '='
      },
      controller: function($scope) {
        $scope.tag = new Tag();
        $scope.tags = Tag.query();
        $scope.createTag = function(tag) {
          tag.$save();
          if (!$scope.project.hasOwnProperty("tag")) { $scope.project.tags = {}; }
          $scope.project.tags[tag.name] = true;
          $scope.tags = Tag.query();
          $scope.tag = new Tag();
        }
      }
    }
  });
