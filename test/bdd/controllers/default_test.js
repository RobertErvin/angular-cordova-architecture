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

  it('should set the initial values correctly', function() {
    expect($scope.numResult).toBeDefined();
    expect($scope.numResult).toEqual(null);
    expect($scope.foo).toBeDefined();
  });

  it('should call the foo() function correctly', function() {
    spyOn($scope, 'foo').and.callThrough();
    $scope.foo(1, 2);
    expect($scope.foo).toHaveBeenCalled();
    expect($scope.foo).toHaveBeenCalledWith(1, 2);
  });
  
  it('should successfully add the two numbers together', function() {
    $scope.foo(1, 2);
    expect($scope.numResult).toEqual(3);
  });
}); // End DefaultCtrl Testing