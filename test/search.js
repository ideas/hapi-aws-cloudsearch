'use strict';

// Load external modules
const Lab = require('lab');

// Load internal modules
const Search = require('../src/search');
const CloudSearchStrategy = require('../src/strategies/cloudsearch');
const StubStrategy = require('../src/strategies/stub');


// Test shortcuts
const lab = exports.lab = Lab.script();
const expect = Lab.assertions.expect;

let searchParams;
let search;

lab.describe('#Search class', () => {
  lab.describe('constructor', () => {
    lab.beforeEach((done) => {
      searchParams = {
        region: 'us-west-1',
        endpoint: 'https://www.ideapod.com'
      };
      done();
    });

    lab.it('constructs a Search object from this class', (done) => {
      search = new Search(searchParams);
      expect(search._settings.endpoint).to.equal('https://www.ideapod.com');
      done();
    });

    lab.it('constructs a Search object from this class with cloudsearch strategy, ' +
      'if simulate param is undefined', (done) => {
      search = new Search(searchParams);
      expect(search._strategy instanceof CloudSearchStrategy).to.equal(true);
      done();
    });

    lab.it('constructs a Search object from this class with stub strategy, ' +
      'if simulate param is true', (done) => {
      search = new Search(searchParams, true);
      expect(search._strategy instanceof StubStrategy).to.equal(true);
      done();
    });
  });

  lab.describe('uploadDocuments', () => {
    lab.beforeEach((done) => {
      search = new Search({
        region: 'us-west-1',
        endpoint: 'https://www.ideapod.com'
      });
      done();
    });
    lab.it('call its strategies uploadDocuments method', (done) => {
      // TODO How can I unit test this? In this case, we should use rewire.
      done();
    });
  });
});
