'use strict';

// Load external modules
const Joi = require('joi');

// Load internal modules
let Search = require('./search')

exports.register = function (server, options, next) {
  const result = _validateOptions(options)
  if (result.error) {
    return next(result.error);
  }

  let search = new Search(result.value);
  server.expose('search', search);

  next();
};

exports.register.attributes = {
  name: 'hapi-aws-cloudsearch'
};

function _validateOptions(options) {
  const schema = {
    region: Joi.string(),
    cloudsearchdomain: Joi.string().regex(/^[0-9]{4}-[0-9]{2}-[0-9]{2}/)
  };
  return Joi.validate(options, schema);
}
