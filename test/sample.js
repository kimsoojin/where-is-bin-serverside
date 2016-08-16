var assert  = require('assert');
fs = require('fs');
describe('BDD style', function() {
  before(function() {
    // excuted before test suite
  });

  after(function() {
    // excuted after test suite
  });

  beforeEach(function() {
    // excuted before every test
  });

  afterEach(function() {
    // excuted after every test
  });
  
  describe('#example', function() {
    it('this is a test.', function() {
      // write test logic
      assert.equal(1+1, 2);
    });
  });
  describe('calculation', function() {
    it('1+1 should be 2', function(done) {
      fs.readFile('example.txt', done);
    });
  });
});