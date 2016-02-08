'use strict';

module.exports = {
  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION || 'us-west-1',
    apiVersions: {
      cloudsearchdomain: "2013-01-01"
    }
  }
}
