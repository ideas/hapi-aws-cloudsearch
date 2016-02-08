'use strict';

// Load external modules

// Load internal modules
const CloudSearchStrategy = require('./strategies/cloudsearch');
const StubStrategy = require('./strategies/stub');

class Search {
  constructor(options, simulate) {
    this._settings = options
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
        .catch(reject)

    });
  };

  //search(params) {
  //  return new Promise((resolve, reject) => {
  //    AWS.config.update(settings.aws);
  //    var csd = new AWS.CloudSearchDomain(settings.awsCloudSearchDomain.ideaDomain);
  //    csd.search(params, (err, res) => {
  //      if (err) return reject(err)
  //      return resolve(res)
  //    });
  //  });
  //};
  //
  //addDocument(idea, callback) {
  //  // Remove certain UTF8 characters from the text
  //  var utf8CharsRegex = /[^\u0009\u000a\u000d\u0020-\uD7FF\uE000-\uFFFD]/g;
  //  var title = idea.title.replace(utf8CharsRegex, '');
  //  var body = idea.body.replace(utf8CharsRegex, '');
  //
  //  var hashtags = Twitter.extractHashtags(idea.body);
  //  hashtags = hashtags.map(function (hashtag) {
  //
  //    return hashtag.toLowerCase();
  //  });
  //
  //  var content = {
  //    type: 'add',
  //    id: idea._id,
  //    fields: {
  //      'title': title,
  //      'body': body,
  //      'hashtags': hashtags,
  //      'created_at': idea._id.getTimestamp()
  //    }
  //  };
  //
  //  this.uploadDocuments(content, callback);
  //};

}

module.exports = Search;
