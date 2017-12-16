
'use strict';
angular
  .module('psJwtApp')
  .config(function ($urlRouterProvider, $stateProvider, $httpProvider) {
    $urlRouterProvider.otherwise('/');
      $stateProvider
        .state('main', {
          url: '/',
          templateUrl: '/views/main.html'
        })

       .state('register', {
        url: '/register',
        templateUrl: '/views/register.html',
        controller: 'RegisterCtrl'
      })

        .state('logout',{
        url: '/logout',
        controller: 'LogoutCtrl'
      })

       .state('jobs',{
        url: '/jobs',
        templateUrl: '/views/jobs.html',
        controller: 'JobsCtrl'
      })

        .state('login',{
          url: '/login',
          templateUrl: '/views/login.html',
          controller: 'LoginCtrl'
        });

      $httpProvider.interceptors.push('authInterceptor');
})

  .constant('API_URL', "http://127.0.0.1:3000/");

