'use strict';

// Load external modules
const Lab = require('lab');
const MockAWS = require('mock-aws');

// Load internal modules
const StubStrategy = require('../../src/strategies/stub');

// Test shortcuts
const lab = exports.lab = Lab.script();
const expect = Lab.assertions.expect;

lab.after((done) => {
  MockAWS.restore();
  done();
});

lab.describe('StubStrategy', () => {
  const strategy = new StubStrategy();

  lab.describe('uploadDocuments', () => {
    lab.it('upload a document', (done) => {
      strategy.uploadDocuments({})
        .then((data) => {
          expect(data.status).to.be.true();
          done();
        })
        .catch(done);
    });
    lab.it('reject error if no params', (done) => {
      strategy.uploadDocuments()
        .catch((err) => {
          expect(err).to.exist();
          done();
        });
    });
  });

  lab.describe('search', () => {
    lab.it('can search a document', (done) => {
      strategy.search({})
        .then((data) => {
          expect(data.status).to.be.true();
          done();
        })
        .catch(done);
    });
    lab.it('reject error if no params', (done) => {
      strategy.search()
        .catch((err) => {
          expect(err).to.exist();
          done();
        });
    });
  });
});
