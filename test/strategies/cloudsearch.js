'use strict';

// Load external modules
const Lab = require('lab');
const MockAWS = require('mock-aws');

// Load internal modules
const CloudSearchStrategy = require('../../src/strategies/cloudsearch');

// Test shortcuts
const lab = exports.lab = Lab.script();
const expect = Lab.assertions.expect;

lab.after((done) => {
  MockAWS.restore();
  done();
});

lab.describe('CloudSearchStrategy', () => {
  lab.describe('uploadDocuments', () => {
    lab.it('upload a document', (done) => {

      // TODO what should be the return value?
      MockAWS.mock('CloudSearchDomain', 'uploadDocuments', {
        status: true
      });

      // TODO Should we add more options?
      const strategy = new CloudSearchStrategy({});

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
