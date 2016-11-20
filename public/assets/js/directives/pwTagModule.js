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
          Tag.query().$promise.then(function(data) {
            if (!$scope.project.hasOwnProperty("tags")) { $scope.project.tags = {}; }
            for (var i = 0, l = data.length; i < l; i++) {
              if (tag.name === data[i].name) {
                $scope.project.tags[tag.name] = true;
                $scope.tag = new Tag();
                return;
              }
            }
            tag.$save();
            $scope.project.tags[tag.name] = true;
            $scope.tags = Tag.query();
            $scope.tag = new Tag();
          });
        }
      }
    }
  });
