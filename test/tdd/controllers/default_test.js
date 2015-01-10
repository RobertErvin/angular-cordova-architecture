'use strict';

describe('The Default Controller', function() {

  beforeEach(module('exampleApp'));

  var $scope, $controller;

  beforeEach(inject(function(_$controller_, _$rootScope_){
    $scope = _$rootScope_.$new();
    $controller = _$controller_('DefaultCtrl', { 
      $scope: $scope 
    });
  }));

  describe(' ', function() {
    beforeEach(function() {
      spyOn($scope, 'foo').and.callThrough();
    });

    it('should check that $scope.numResult is defined', function() {
      expect($scope.numResult).toBeDefined();
    });

    it('should check that $scope.numResult is initially null', function() {
      expect($scope.numResult).toEqual(null);
    });

    it('should check that $scope.foo() is defined', function() {
      expect($scope.foo).toBeDefined();
    });

    it('should check that $scope.foo() is called', function() {
      $scope.foo(1, 2);
      expect($scope.foo).toHaveBeenCalled();
    });
    
    it('should check that $scope.foo() is called with the correct parameters', function() {
      $scope.foo(1, 2);
      expect($scope.foo).toHaveBeenCalledWith(1, 2);
    });

    it('should set $scope.numResult correctly', function() {
      $scope.foo(1, 2);
      expect($scope.numResult).toEqual(3);
    }); // End it   
  }); // End $scope.foo() testing
}); // End DefaultCtrl Testing