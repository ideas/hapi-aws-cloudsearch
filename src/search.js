'use strict';

// Load internal modules
const CloudSearchStrategy = require('./strategies/cloudsearch');
const StubStrategy = require('./strategies/stub');

class Search {
  constructor(options, simulate) {
    this._settings = options;
    this._strategy = simulate ? new StubStrategy(options) : new CloudSearchStrategy(options);
  }

  uploadDocuments(searchContent) {
    const params = {
      contentType: 'application/json',
      documents: JSON.stringify([searchContent])
    };

    return this._strategy.uploadDocuments(this._settings, params);
  }

}

module.exports = Search;
