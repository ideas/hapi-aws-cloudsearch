'use strict';

// Load internal modules
const CloudSearchStrategy = require('./strategies/cloudsearch');
const StubStrategy = require('./strategies/stub');

class Search {
  constructor(options, simulate) {
    this._settings = options;
    this._strategy = simulate ? new StubStrategy(options) : new CloudSearchStrategy(options);
  }

  uploadDocuments(params) {
    return this._strategy.uploadDocuments(params);
  }

  search(params) {
    return this._strategy.search(params);
  }

}

module.exports = Search;
