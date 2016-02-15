'use strict';

// Load external modules
const Aws = require('aws-sdk');
const Twitter = require('twitter-text');

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

  addDocument(idea) {
    // Remove certain UTF8 characters from the text
    const utf8CharsRegex = /[^\u0009\u000a\u000d\u0020-\uD7FF\uE000-\uFFFD]/g;
    const title = idea.title.replace(utf8CharsRegex, '');
    const body = idea.body.replace(utf8CharsRegex, '');

    let hashtags = Twitter.extractHashtags(idea.body);
    hashtags = hashtags.map(function (hashtag) {
      return hashtag.toLowerCase();
    });
    const content = {
      type: 'add',
      id: idea._id,
      fields: {
        title,
        body,
        hashtags,
        created_at: idea._id.getTimestamp()
      }
    };

    return this.uploadDocuments(content);
  }
}

module.exports = CloudSearchStrategy;
