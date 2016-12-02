angular.module('ProfessionalWebsite')
  .directive('pwPageFooter', function() {
    return {
      replace: true,
      restrict: "E",
      templateUrl: "assets/templates/directives/pwPageFooter.html"
    }
  });


function(){
  var toCode = function(mockup) {
    return function(chai) {
      return mockup * chai;
    };
  }

  project1 = toCode(mockup_1);
  product_v1 = project1(bengal_chai);
  product_v2 = project1(masala_chai);
  product_v3 = project1(spiced_masala_chai);

  emailToClient({
    "Subject": "Spiced Masala Chai yielded best result!!",
    "Body": " ... "
  });
}
