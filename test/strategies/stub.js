'use strict';

// Load external modules
const Lab = require('lab');
const MockAWS = require('mock-aws');

// Load internal modules
const StubStrategy = require('../../src/strategies/stub');

// Test shortcuts
const lab = exports.lab = Lab.script();
const expect = Lab.assertions.expect;

let strategy;

lab.after((done) => {
  MockAWS.restore();
  done();
});

lab.before((done) => {
  strategy = new StubStrategy({
    region: 'us-west-1',
    endpoint: 'https://www.ideapod.com'
  });
  done();
});

lab.describe('StubStrategy', () => {
  lab.describe('uploadDocuments', () => {
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
        .then((done) => {
          done(new Error('error hasn\'t been thrown'));
        })
        .catch((err) => {
          expect(err).to.exist();
          done();
        });
    });
  });

  lab.describe('search', () => {
    lab.it('can search a document', (done) => {
      const params = {
        contentType: 'application/json',
        documents: JSON.stringify([{ 'bar': 'foo' }])
      };
      strategy.search(params)
        .then((data) => {
          expect(data.status).to.be.true();
          done();
        })
        .catch(done);
    });
    lab.it('reject error if no params', (done) => {
      strategy.search()
        .then((done) => {
          done(new Error('error hasn\'t been thrown'));
        })
        .catch((err) => {
          expect(err).to.exist();
          done();
        });
    });
  });

  lab.describe('addDocument', () => {
    lab.it('can add a document', (done) => {
      const params = {
        contentType: 'application/json',
        documents: JSON.stringify([{ 'bar': 'foo' }])
      };
      strategy.addDocument(params)
        .then((data) => {
          expect(data.status).to.be.true();
          done();
        })
        .catch(done);
    });
    lab.it('reject error if no params', (done) => {
      strategy.search()
        .then((done) => {
          done(new Error('error hasn\'t been thrown'));
        })
        .catch((err) => {
          expect(err).to.exist();
          done();
        });
    });
  });
});
