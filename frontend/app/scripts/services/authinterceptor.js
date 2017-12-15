'use strict';


angular.module('psJwtApp').factory('authInterceptor', function (authToken) {

    var request = function(config){
      var token = authToken.getToken();
      if (token) {
        config.headers.Authorization = 'Bearer ' + token;
      }
      return config;
    };

    var response = function(response) {
      return response
    };


    return {
      request: request,
      response: response
    };
  });
