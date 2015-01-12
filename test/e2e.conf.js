exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['e2e/**/*_test.js'],
  framework: 'jasmine2',
  baseUrl: 'http://localhost:9001'
};
