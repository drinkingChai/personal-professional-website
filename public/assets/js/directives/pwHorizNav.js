angular.module('ProfessionalWebsite')
  .directive('pwHorizNav', function() {
    return {
      replace: true,
      restrict: "E",
      templateUrl: "assets/templates/directives/pwHorizNav.html",
      controller: function($scope, $location) {
        $scope.isPage = function(name) {
          return $location.path().split('/').pop() === name;
        }
      }
    }
  });
