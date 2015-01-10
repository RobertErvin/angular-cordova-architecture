'use strict';

/**
 * @ngdoc function
 * @name exampleApp.controller:DefaultCtrl
 * @description
 * # DefaultCtrl
 * Controller of the exampleApp
 */
angular.module('exampleApp')
  .controller('DefaultCtrl', ['$scope',
  	function($scope) {
      $scope.numResult = null;
      
      $scope.foo = function(numOne, numTwo) {
        $scope.numResult = numOne + numTwo;
      };
	}]);