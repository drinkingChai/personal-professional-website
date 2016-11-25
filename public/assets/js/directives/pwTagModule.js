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
        $scope.newTag = new Tag();
        $scope.tags = Tag.query();

        //
        // initializes a temp tag set
        //
        $scope.init = function() {
          $scope.temp = new Set($scope.project.tags || []);
        }

        //
        // toggle a tag and change it for the project
        // @param {String} tag
        //
        $scope.toggleTag = function(tag) {
          if (!$scope.temp.has(tag)) {
            $scope.temp.add(tag);
          } else {
            $scope.temp.delete(tag);
          }

          $scope.project.tags = Array.from($scope.temp).sort();
        }

        //
        // create a new tag and assign it to the project
        // @param {String} newTag
        // 
        $scope.createTag = function(newTag) {
          $scope.toggleTag(newTag.name);

          newTag.$save();
          $scope.tags = Tag.query();
          $scope.newTag = new Tag();
        }
      }
    }
  });
