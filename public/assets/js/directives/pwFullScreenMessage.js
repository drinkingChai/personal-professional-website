angular.module('ProfessionalWebsite')
  .directive('pwFullScreenMessage', function() {
    return {
      replace: true,
      restrict: 'E',
      templateUrl: 'assets/templates/directives/pwFullScreenMessage.html',
      scope: {
        message: '=',
        displayed: '='
      }
    }
  });
