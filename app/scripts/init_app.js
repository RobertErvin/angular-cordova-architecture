'use strict';
var CordovaInit = function() {
    var onDeviceReady = function() {
      receivedEvent('deviceready');
    };
    var receivedEvent = function() {
      var body = angular.element(document).find('body');
      angular.bootstrap(body, ['exampleApp']);
      if (navigator.splashscreen !== undefined) {
        navigator.splashscreen.hide();
      }
    };
    this.bindEvents = function() {
      document.addEventListener('deviceready', onDeviceReady, false);
    };
    // If cordova is present, wait for it to initialize, otherwise just try to
    // bootstrap the application.
    if (window.cordova !== undefined) {
      this.bindEvents();
    } else {
      receivedEvent();
    }
  };
 
var init = function() {
  new CordovaInit();
};

init();