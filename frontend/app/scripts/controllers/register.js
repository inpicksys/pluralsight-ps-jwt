'use strict';

angular.module('psJwtApp')
  .controller('RegisterCtrl', function ($scope, alert, $auth) {
    /*$scope.email = $stateParams.email;
    $scope.password = $stateParams.password;*/
    console.log($scope.remail);
    console.log($scope.rpassword);
    $scope.submit = function(){
      debugger;
      $auth.signup({email: $scope.remail, password: $scope.rpassword}).then(function(response){
       /* if (response.status == 401) {
          alert('warning', 'Something went wrong :(', response.message);
          return;
        }*/
        alert('success', 'Account Created!', 'Welcome, ' + response.data.user.email + '!');
      }).catch(function(errResponse){
        console.log(errResponse);
          alert('warning', 'Something went wrong :(', errResponse.message);
        }
      );
    };
});
