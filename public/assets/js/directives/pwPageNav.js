angular.module('ProfessionalWebsite')
  .directive('pwPageNav', function() {
    return {
      replace: true,
      restrict: "E",
      templateUrl: "assets/templates/directives/pwPageNav.html",
      controller: function($scope, $location) {
        $scope.isPage = function(name) {
          return $location.path().split('/').pop() === name;
        }
      }
    }
  });
