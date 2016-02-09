'use strict';

class StubStrategy {
  constructor(options) {
  }

  uploadDocuments(params) {
    // TODO what should be the return value?
    return Promise.resolve({
      status: true
    });
  }
}

module.exports = StubStrategy;
