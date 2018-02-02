'use strict';

angular.module('psJwtApp')
  .controller('LoginCtrl', function ($scope, $rootScope, alert, auth, $auth) {
    $scope.submit = function(){
      $auth.login({email: $scope.email, password: $scope.password}).then(function(response){
        /*if (response.status == 500) {
          alert('warning', 'Something went wrong :( ', res ponse.statusText);
          return;
        }*/
        var message = 'Thanks for coming ' + response.data.user.email + '!';

        if (!response.data.user.active)
          message = 'Just a reminder, please activate your account soon :-)';

        alert('success', 'Welcome!', message);
      }).catch(function(errResponse){
        handleError(errResponse);
      });
    };

    $scope.authenticate = function(provider){
      $auth.authenticate(provider).then(function(response){
        alert('success', 'Welcome!', 'Thanks for coming ' + response.data.user.displayName + '!');
      }, function(errResponse){
        handleError(errResponse);
      });
    };

    function handleError(err){
      alert('warning', 'Something went wrong :(', err.message);
    };
  });
