'use strict';

/**
 * @ngdoc service
 * @name psJwtApp.alert
 * @description
 * # alert
 * Service in the psJwtApp.
 */
angular.module('psJwtApp')
  .service('alert', function ($rootScope, $timeout) {
    return function(type, title, message, timeout ){
      var alertTimeout;
      $rootScope.alert = {
        hasBeenShown: true,
        show: true,
        type: type,
        message: message,
        title: title
      };

      $timeout.cancel(alertTimeout);

      alertTimeout = $timeout(function(){
          $rootScope.alert.show = false;
      }, timeout || 2000);
    };
  });
