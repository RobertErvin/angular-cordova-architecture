'use strict';

describe('Integration/E2E Testing', function() { 

  // test default route
  it('should jump to the /default path when / is accessed', function() {
    browser.get('http://localhost:9001/#/');
    expect(browser.getCurrentUrl()).toBe('http://localhost:9001/#/default');
  });
 });