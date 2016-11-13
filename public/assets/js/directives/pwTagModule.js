angular.module('ProfessionalWebsite')
  .directive('pwTagModule', function() {
    return {
      replace: true,
      restrict: "E",
      templateUrl: "assets/templates/directives/pwTagModule.html"
    }
  });
