'use strict';

// Load external modules
const Aws = require('aws-sdk');
const Uuid = require('node-uuid');

class StubStrategy {
  constructor(options) {
    this._sqs = new Aws.SQS(options);
  }

  sendMessage(params) {
    return Promise.resolve({
      MD5OfMessageBody: Aws.util.crypto.md5(params.MessageBody),
      MessageId: Uuid.v4()
    });
  }
}

module.exports = StubStrategy;
