'use strict';

// Load external modules
const Joi = require('joi');

// Load internal modules
const Search = require('./search');

function _validateOptions(options) {
  const schema = {
    region: Joi.string(),
    endpoint: Joi.string().uri().required()
  };
  return Joi.validate(options, schema, {
    allowUnknown: true
  });
}

exports.register = function (server, options, next) {
  const result = _validateOptions(options.search);
  if (result.error) {
    return next(result.error);
  }

  const search = new Search(result.value, options.simulate);
  server.expose('search', search);

  next();
};

exports.register.attributes = {
  name: 'hapi-aws-cloudsearch'
};
