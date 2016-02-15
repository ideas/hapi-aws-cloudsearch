'use strict';

// Load external modules
const Lab = require('lab');
const MockAWS = require('mock-aws');

// Load internal modules
const CloudSearchStrategy = require('../../src/strategies/cloudsearch');

// Test shortcuts
const lab = exports.lab = Lab.script();
const expect = Lab.assertions.expect;

let strategy;

lab.after((done) => {
  MockAWS.restore();
  done();
});

lab.before((done) => {
  strategy = new CloudSearchStrategy({
    region: 'us-west-1',
    endpoint: 'https://www.ideapod.com'
  });
  done();
});

lab.describe('CloudSearchStrategy', () => {
  lab.describe('uploadDocuments', () => {
    lab.beforeEach((done) => {
      MockAWS.mock('CloudSearchDomain', 'uploadDocuments', (params, call) => {
        if (!params) {
          return call(new Error('no params'));
        }
        return call(null, { status: true });
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
    lab.beforeEach((done) => {
      MockAWS.mock('CloudSearchDomain', 'search', (params, call) => {
        if (!params) {
          return call(new Error('no params'));
        }
        return call(null, { status: true });
      });
      done();
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

  lab.describe('addDocument', () => {
    let testIdea;
    let isUploadDocumentsCalled;

    lab.beforeEach((done) => {
      testIdea = {
        title: 'testTitle',
        body: 'testBody',
        _id: {
          getTimestamp: () => {
            return Date.now();
          }
        }
      };
      done();
    });

    lab.beforeEach((done) => {
      isUploadDocumentsCalled = false;
      MockAWS.mock('CloudSearchDomain', 'uploadDocuments', (params, call) => {
        if (!params) {
          return call(new Error('no params'));
        }
        expect(params.type).to.equal('add');
        isUploadDocumentsCalled = true;
        return call(null, { status: true });
      });
      done();
    });

    lab.it('calls uploadDdocuments with type "add"', (done) => {
      strategy.addDocument(testIdea)
        .then((data) => {
          expect(data).to.be.object();
          expect(isUploadDocumentsCalled).to.be.true();
          done();
        })
        .catch(done);
    });

    lab.it('remove unicode characters', (done) => {
      testIdea.body = '1<>$Ł~ˇ^˘°˛`˙´start_\uFFFE_end';
      MockAWS.mock('CloudSearchDomain', 'uploadDocuments', (params, call) => {
        expect(params.fields.body).to.equal('1<>$Ł~ˇ^˘°˛`˙´start__end');
        return call();
      });
      strategy.addDocument(testIdea).then((data) => {
        done();
      }).catch(done);
    });

    lab.it('collect words with hashtags', (done) => {
      testIdea.body = 'Hello #foo World!';
      MockAWS.mock('CloudSearchDomain', 'uploadDocuments', (params, call) => {
        expect(params.fields.hashtags[0]).to.equal('foo');
        expect(params.fields.hashtags.length).to.equal(1);
        return call();
      });
      strategy.addDocument(testIdea).then((data) => {
        done();
      }).catch(done);
    });
  });
});
