angular.module('ProfessionalWebsite')
  .directive('pwPageFooter', function() {
    return {
      replace: true,
      restrict: "E",
      templateUrl: "assets/templates/directives/pwPageFooter.html"
    }
  });
