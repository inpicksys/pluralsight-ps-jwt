'use strict';

angular.module('psJwtApp')
  .controller('RegisterCtrl', function ($scope, $rootScope, $http, alert, authToken) {
    $scope.submit = function(){
      var url = 'http://localhost:3000/register';
      var user = {
        email: $scope.email,
        password: $scope.password
      };

      var options = {
        url: url,
        method: 'POST',
        data: user
      };

      $http(options).then(function(response){
        alert('success', 'Ok!', 'You are now registered' );
        authToken.setToken(res.token);
      }, function(errResponse){
        alert('warning', 'Oops!', 'Could not register' );
      });

      console.log('working...');
    };
  });
