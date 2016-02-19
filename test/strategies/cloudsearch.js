'use strict';

// Load external modules
const Lab = require('lab');
const MockAWS = require('mock-aws');

// Load internal modules
const CloudSearchStrategy = require('../../src/strategies/cloudsearch');

// Test shortcuts
const lab = exports.lab = Lab.script();
const expect = Lab.assertions.expect;


lab.describe('CloudSearchStrategy', () => {
  const strategy = new CloudSearchStrategy({
    region: 'us-west-1',
    endpoint: 'http://ec2.us-west-1.amazonaws.com'
  });

  lab.after((done) => {
    MockAWS.restore();
    done();
  });

  lab.before((done) => {
    done();
  });

  lab.describe('uploadDocuments', () => {
    lab.beforeEach((done) => {
      MockAWS.mock('CloudSearchDomain', 'uploadDocuments', (params, callback) => {
        if (!params) {
          return callback(new Error('no params'));
        }
        return callback(null, { status: true });
      });
      done();
    });

    lab.it('upload a document', (done) => {
      const params = {
        contentType: 'application/json',
        documents: JSON.stringify([{ 'bar': 'foo' }])
      };
      strategy.uploadDocuments(params)
        .then((data) => {
          expect(data.status).to.be.true();
          done();
        })
        .catch(done);
    });

    lab.it('reject error if no params', (done) => {
      strategy.uploadDocuments()
        .catch((err) => {
          expect(err).to.be.object();
          done();
        });
    });
  });

  lab.describe('search', () => {
    MockAWS.mock('CloudSearchDomain', 'search', (params, callback) => {
      if (!params) {
        return callback(new Error('no params'));
      }
      return callback(null, { status: true });
    });

    lab.it('search in the cloud', (done) => {
      strategy.search({ title: 'test' })
        .then((data) => {
          expect(data).to.be.object();
          done();
        })
        .catch(done);
    });

    lab.it('requires params', (done) => {
      strategy.search()
        .catch((err) => {
          expect(err).to.be.object();
          done();
        });
    });
  });
});
