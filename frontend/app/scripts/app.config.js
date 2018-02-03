'use strict';
angular
  .module('psJwtApp')
  .config(function ($urlRouterProvider, $stateProvider, $httpProvider, $authProvider, API_URL) {
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

      $authProvider.loginUrl = API_URL + 'auth/login';
      $authProvider.signupUrl = API_URL + 'auth/register';

      $authProvider.google({
          clientId: '49338551586-p1jvua1dkgd5d3l4qdmjhc9pa33uhdl6.apps.googleusercontent.com',
           url: API_URL + 'auth/google'
      });

      $authProvider.facebook({
        clientId: '388010974972482',
        url: API_URL + 'auth/facebook'
      });

      $httpProvider.interceptors.push('authInterceptor');
})

  //.constant('API_URL', "http://127.0.0.1:3000/")
  .constant('API_URL', "http://localhost:1337/")

  .run(function($window){
    var params = $window.location.search.substring(1);

    if(params && $window.opener && $window.opener.location.origin === $window.location.origin){
        var pair = params.split('=');
        var code = decodeURIComponent(pair[1]);

        $window.opener.postMessage(code, $window.location.origin);
    }
  });

