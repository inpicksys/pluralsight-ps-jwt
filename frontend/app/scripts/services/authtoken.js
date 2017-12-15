'use strict';

angular.module('psJwtApp').factory('authToken', function ($window) {

    var storage = $window.localStorage;
    var cachedToken;
    var userToken = 'userToken';



    var getToken= function(){
      if(!cachedToken)
        cachedToken = storage.getItem('userToken');

      return cachedToken;
    };

    var isAuthenticated = function () {
      return !!getToken();
    }

    var removeToken = function(){
      cachedToken = null;
      storage.removeItem(userToken);
    };

    var setToken = function (token) {
      cachedToken = token;
      storage.setItem('userToken', token);
    };

    return {
      setToken:setToken,
      getToken:getToken,
      isAuthenticated: isAuthenticated,
      removeToken:removeToken
    };
  });
