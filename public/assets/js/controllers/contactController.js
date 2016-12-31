angular.module('ProfessionalWebsite')
  .controller('ContactController', function(Email, $scope, $location) {
    $scope.email = new Email();
    $scope.sendEmail = function(email) {
      email.$save();
      $location.path('/contact');
    }
  })
