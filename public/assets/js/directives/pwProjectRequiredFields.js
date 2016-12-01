angular.module('ProfessionalWebsite')
  .directive('pwProjectRequiredFields', function() {
    return {
      replace: true,
      restrict: "E",
      templateUrl: "assets/templates/directives/pwProjectRequiredFields.html"
    }
  });
