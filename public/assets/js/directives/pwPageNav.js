angular.module('ProfessionalWebsite')
  .directive('pwPageNav', function() {
    return {
      replace: true,
      restrict: "E",
      templateUrl: "assets/templates/directives/pwPageNav.html",
      controller: function($scope, $location) {
        $("nav.v-nav, .navbar-menu-icon").click(function() {
          menuAndOverlay();
        })

        $scope.isPage = function(name) {
          return $location.path().split('/').pop() === name;
        }
      }
    }
  });
