'use strict';

// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function(config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: [
      'jasmine'
      ],

    // list of files / patterns to exclude
    exclude: [],

    // web server port
    port: 9001,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['PhantomJS'],

    files: [],

    // Continuous Integration mode
    // If true, Karma will start and capture all configured browsers, run tests and then exit 
    // with an exit code of 0 or 1 depending on whether all tests passed or any tests failed.
    singleRun: true,

    // Karma Coverage

    // coverage reporter generates the coverage
    reporters: ['progress', 'coverage'],


    // source files, that you wanna generate coverage for
    // do not include tests or libraries
    // (these files will be instrumented by Istanbul)
    preprocessors: {
      '../app/scripts/**/*.js': ['coverage']
    }
  });
};