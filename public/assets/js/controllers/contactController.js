angular.module('ProfessionalWebsite')
  .controller('ContactController', function(Email, $scope, $location) {
    $scope.email = new Email();
    $scope.displayMessage = false;
    $scope.sendEmail = function(email) {
      email.$save();
      $scope.displayMessage = !$scope.displayMessage;
      $location.path('/contact');
    }
  })
