'use strict';

class StubStrategy {

  uploadDocuments(params) {
    return new Promise((resolve, reject) => {
      if (!params) {
        return reject('no params');
      }
      return resolve({ status: true });
    });
  }

  search(params) {
    return new Promise((resolve, reject) => {
      if (!params) {
        return reject('no params');
      }
      return resolve({ status: true });
    });
  }
}

module.exports = StubStrategy;
