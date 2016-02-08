'use strict';

// Load external modules
const Aws = require('aws-sdk');

// Load internal modules
const config = require('config')

Aws.config.update(config.get('aws'));

class CloudSearchStrategy {
  constructor(options) {
    this._csd = new Aws.CloudSearchDomain(options.awsCloudSearchDomain.ideaDomain);
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
}

module.exports = CloudSearchStrategy;
