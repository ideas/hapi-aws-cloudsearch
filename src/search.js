'use strict';

// Load external modules

// Load internal modules
const CloudSearchStrategy = require('./strategies/cloudsearch');
const StubStrategy = require('./strategies/stub');

class Search {
  constructor(options, simulate) {
    this._settings = options;
    this._strategy = simulate ? new StubStrategy(options) : new CloudSearchStrategy(options);
  }

  uploadDocuments(searchContent) {
    return new Promise((resolve, reject) => {
      const params = {
        contentType: 'application/json',
        documents: JSON.stringify([searchContent])
      };
      this._strategy
        .uploadDocument(this._settings, params)
        .then(resolve)
        .catch(reject);
    });
  }

}

module.exports = Search;
