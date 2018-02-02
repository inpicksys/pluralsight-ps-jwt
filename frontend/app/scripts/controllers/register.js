'use strict';

angular.module('psJwtApp')
  .controller('RegisterCtrl', function ($scope, alert, $auth) {
    $scope.submit = function(){
      $auth.signup({email: $scope.remail, password: $scope.rpassword}).then(function(response){
       /* if (response.status == 401) {
          alert('warning', 'Something went wrong :(', response.message);
          return;
        }*/
        alert('success', 'Account Created!', 'Welcome, ' + response.data.user.email + '! Please email activate your account in the next several days.');
      }).catch(function(errResponse){
        console.log(errResponse);
          alert('warning', 'Something went wrong :(', errResponse.message);
        }
      );
    };
});
