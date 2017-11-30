/**
 * Created by Misha on 11/19/2017.
 */
'use strict';
angular
  .module('psJwtApp')
  .config(function ($urlRouterProvider, $stateProvider) {
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
      });
	/*	$routeProvider
				.when('/', {
					templateUrl: 'views/main.html',
					controller: 'MainCtrl',
				controllerAs: 'main'
			})
			.when('/about', {
				templateUrl: 'views/about.html',
				controller: 'AboutCtrl',
				controllerAs: 'about'
			})
			.otherwise({
				redirectTo: '/'
			});*/

});

