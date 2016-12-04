angular.module('ProfessionalWebsite')
  .directive('pwPageNav', function() {
    return {
      replace: true,
      restrict: "E",
      templateUrl: "assets/templates/directives/pwPageNav.html",
      controller: function($scope, $location) {
        $("nav").click(function() {
          menuAndOverlay();
        })
      }
    }
  });
