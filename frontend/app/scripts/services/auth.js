'use strict';

angular.module('psJwtApp').service('auth', function ($http, authToken, API_URL, $state) {

  var authSuccessful = function(response){
    authToken.setToken(response.data.token);
    $state.go('main');
    return response
  };

  var authError = function(response){
    console.log('auth error');
    return response;
  };

  var login = function(email, password) {
    var loginData = {
      email: email,
      password: password
    };

    var options = {
      url: API_URL + "login",
      method: 'POST',
      dataType: 'json',
      data: loginData
    };

    return $http(options).then(authSuccessful, authError);
  };

  var register = function(email, password) {
    var registerData = {
      email: email,
      password: password
    };

    var options = {
      url: API_URL + "register",
      method: 'POST',
      dataType: 'json',
      data: registerData
    };

    return $http(options).then(authSuccessful, authError);
  };



  return {
    login: login,
    register: register
  }
});
