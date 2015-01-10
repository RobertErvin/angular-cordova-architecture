'use strict';
angular.module('exampleApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ngAnimate',
  'ionic'
])
  .config(function ($routeProvider, $httpProvider) {
    $routeProvider
      .when('/default', {
        templateUrl: 'views/default.html',
        controller: 'DefaultCtrl'
      })
      .otherwise({
        redirectTo: '/default'
      });

    // Angular $httpProvider has a bug with the "PATCH" method. This fixes it.
    $httpProvider.defaults.headers.patch = {
      'Content-Type': 'application/json;charset=utf-8'
    };
  });
