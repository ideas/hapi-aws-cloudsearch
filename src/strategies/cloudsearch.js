'use strict';

// Load external modules
const Aws = require('aws-sdk');

class CloudSearchStrategy {
  constructor(options) {
    this._csd = new Aws.CloudSearchDomain(options);
  }

  uploadDocuments(params) {
    return new Promise((resolve, reject) => {
      this._csd.uploadDocuments(params, (err, res) => {
        if (err) {
          return reject(err);
        }
        resolve(res);
      });
    });
  }

  search(params) {
    return new Promise((resolve, reject) => {
      this._csd.search(params, (err, res) => {
        if (err) {
          return reject(err);
        }
        return resolve(res);
      });
    });
  }
}

module.exports = CloudSearchStrategy;
