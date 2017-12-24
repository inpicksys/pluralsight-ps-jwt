'use strict';

angular.module('psJwtApp').service('auth', function ($http, authToken, API_URL, $state, $window, $q) {

  var authSuccessful = function(response){
    authToken.setToken(response.data.token);
    $state.go('main');
    return response;
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

  var urlBuilder = [];
  var clientId = '49338551586-p1jvua1dkgd5d3l4qdmjhc9pa33uhdl6.apps.googleusercontent.com';
  urlBuilder.push('response_type=code',
    'client_id='+clientId,
    'redirect_uri=' + window.location.origin,
    'scope=profile email');

  var googleAuth = function(email, password) {
    var url = "https://accounts.google.com/o/oauth2/auth?" + urlBuilder.join('&');
    var options = "width=500, height=500, left="+($window.outerWidth - 500)/2 + ", top=" + ($window.outerHeight - 500)/2.5;

    var deferred = $q.defer();

    var popup = $window.open(url, '', options);
    $window.focus();

    $window.addEventListener('message', function(event){
      if(event.origin === $window.location.origin) {
        var code = event.data;
        popup.close();

        var options = {
          url: API_URL + 'auth/google',
          method: 'POST',
          dataType: 'json',
          data: {
            code: code,
            clientId: clientId,
            redirectUri: window.location.origin
          }
        };

       $http(options).then(function(jwt){
         authSuccessful(jwt);
         deferred.resolve(jwt);
       });
      }
    });

    return deferred.promise;
  };


  return {
    login: login,
    register: register,
    googleAuth: googleAuth
  }
});
