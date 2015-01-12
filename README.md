Base Angular App Structure
==========================

## Tech Stack

- [NodeJS](http://nodejs.org/) `Environment Manager`
- [Grunt](http://gruntjs.com/getting-started) `JS Task Runner`
- [Bower](http://bower.io/docs/api/) `Dependency Management`
- [AngularJS](https://code.angularjs.org/1.3.8/docs/api) `JS Framework for Single-Page Apps`
- [Ionic](http://ionicframework.com/docs/) `HTML5 Mobile Development Framework`
- [Karma](https://karma-runner.github.io/0.12/index.html) `JS Test Runner`
- [Cordova](https://cordova.apache.org/docs/en/4.0.0/) `Multiplatform Native API Management`

## Development Environment Setup

##### Install Depencencies

`sudo npm install -g cordova bower grunt-cli protractor`

`sudo gem install compass`

`npm install`

`bower install`

##### Build

Build the app

`sudo grunt build`

Serve the app

`sudo grunt serve`

Build + Serve the app

`sudo grunt serve:www`

##### Integrating into Ripple

Step 1: Add via the [Chrome Web Store](https://chrome.google.com/webstore/detail/ripple-emulator-beta/geelfhphabnejjhdalkjhgipohgpdnoc?hl=en)

Step 2: Run `sudo grunt serve:dist`

Step 3: Click on the Ripple Chrome Icon and select `Enable` and `Apache Cordova/Phonegap (1.0.0)`

## Cordova: Build Locally

Make sure the android sdk or xcode is installed and paths set first.

If they are, run:

`cordova platform add <platform>`

View added platforms

`cordova platform ls`

Build the app

`cordova build <platform>`

Build and load on device

`cordova run <platform>`

**Note:** You will need to plug your device in, and if on android enable debugging mode.

## Cordova: Build Remotely

Add Phonegap App Id to `.cordova/config.json`

Log in to Phonegap's Remote Build API by running

`sudo phonegap remote login` and entering your Phonegap credentials

Run `sudo grunt phonegap:send` to build and send it to Phonegap Remote Build

Navigate to build.phonegap.com/apps/(Your Phonegap App Id)/builds

Scan the QR Code to download the app on your device

## Testing

##### Run All Tests

`sudo grunt test`

##### Unit Testing: 

Code coverage is generated in `test/coverage` and uses [Istanbul](https://github.com/gotwarlost/istanbul) through [Karma Coverage](https://github.com/karma-runner/karma-coverage). It generates `tdd` and `bdd` specific reports and saves the latest ran each day to track coverage over time. Note it does not push to github. 

Framework: [Jasmine](https://jasmine.github.io/2.0/introduction.html)

Commands:
	
Run TDD + BDD Tests: `sudo grunt test:unit`

Run TDD Tests: `sudo grunt test:tdd`

Run BDD Tests: `sudo grunt test:bdd`

Run a Single Test: `sudo grunt test:(target):(fileType):(testName)`

Where:

`(target)` is either `tdd` or `bdd`

`(fileType)` is a directory such as `controllers` or `services`

`(testName)` is the name of the test excluding the `_test.js`, such as `default`

Example: `sudo grunt test:bdd:controllers:default` only runs `test/bdd/controllers/default_test.js`

##### Integation Testing:

Framework: [Protractor](https://angular.github.io/protractor/#/api)

Commands:

Run Integration Tests: `sudo grunt test:e2e`

## Adding Files

##### Add an AngularJS (Controller, Directive, View, etc.) or CSS File

Step 1: Name the file in the correct `app/` directory

Step 2: Add to `app/app.js` if applicable

Step 3: Add to `app/index.html` in the correct location if not a view

Step 4: Add test case files with the same name + `_test` you used in Step 1 in `test/bdd/` and `test/tdd` in the correct directories if applicable 

## Adding Plugins

##### Add a Cordova or ngCordova Plugin

Step 1: Find on [http://plugins.cordova.io](http://plugins.cordova.io/#/) or [http://ngcordova.com/docs/plugins/](http://ngcordova.com/docs/plugins/)

Step 2: Run `cordova plugin add <plugin>`

Step 3: Add to plugin `app/config.xml` with version

##### Add a Bower Plugin

Step 1: Find on [http://bower.io](http://bower.io/search/)

Step 2: Run `bower install <plugin> --save-dev`

Step 3: Add route of `.js` file to `app/index.html` with the rest of the bower dependencies

Step 4: Add module name to `app/scripts/app.js` 

##### Add a Node Module

Step 1: Find on [https://www.npmjs.com/](https://www.npmjs.com/)

Step 2: Run `npm install <plugin>`

## FAQ

###### JSHint error of undefined on defined code

Add code to `.jshintrc` under "globals"

###### Locations of `example` name

`app/scripts/app.js`

`app/scripts/init_app.js`

`app/scripts/controllers/default.js`

`app/config.xml`

`bower.json`

`packages.json`