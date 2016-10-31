angular.module('ProfessionalWebsite')
  .directive('pwPageNav', function() {
    return {
      replace: true,
      restrict: "E",
      templateUrl: "assets/templates/directives/pwPageNav.html"
    }
  });
