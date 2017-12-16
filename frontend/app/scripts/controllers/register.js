'use strict';

angular.module('psJwtApp')
  .controller('RegisterCtrl', function ($scope, alert, auth) {
    $scope.submit = function(){
      auth.register($scope.email, $scope.password).then(function(response){
        if (response.status == 401) {
          alert('warning', 'Something went wrong :(', response.message);
          return;
        }
        alert('success', 'Account Created!', 'Welcome, ' + response.data.user.email + '!');
      }, function(errResponse){
        alert('warning', 'Something went wrong :(', errResponse.message);
      });
    };
});
