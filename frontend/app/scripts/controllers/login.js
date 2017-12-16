'use strict';

angular.module('psJwtApp')
  .controller('LoginCtrl', function ($scope, $rootScope, alert, auth) {
    $scope.submit = function(){
      auth.login($scope.email, $scope.password).then(function(response){
        if (response.status == 500) {
          alert('warning', 'Something went wrong :( ', response.statusText);
          return;
        }
        alert('success', 'Welcome!', 'Thanks for coming ' + response.data.user.email + '!');
      }, function(errResponse){
        alert('warning', 'Something went wrong :(', errResponse.message);
      });
    };
  });
