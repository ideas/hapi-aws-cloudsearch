'use strict';

// Load external modules
const Lab = require('lab');

// Load internal modules
const StubStrategy = require('../../src/strategies/stub');

// Test shortcuts
const lab = exports.lab = Lab.script();
const expect = Lab.assertions.expect;

lab.describe('StubStrategy', () => {
  lab.describe('uploadDocuments', () => {
    lab.it('upload a document', (done) => {
      const strategy = new StubStrategy({region: 'region-1'});

      // TODO what should be the test data?
      const params = {
        contentType: 'application/json',
        documents: JSON.stringify([{'bar': 'foo'}])
      };

      strategy.uploadDocuments(params)
        .then((data) => {
          expect(data.status).to.be.true();
          done();
        })
        .catch(done);
    });
  });
});
