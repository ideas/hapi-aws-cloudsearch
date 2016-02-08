'use strict';

// Load external modules
const Hapi = require('hapi');
const Lab = require('lab');
const rewire = require('rewire')

// Load internal modules
const HapiAwsCloudsearch = require('..');


// Test shortcuts
const lab = exports.lab = Lab.script();
const expect = Lab.assertions.expect;

lab.describe('HapiAwsCloudsearch', () => {
  lab.it('registers', (done) => {
    const server = new Hapi.Server();
    let HapiAwsCloudsearchMock = rewire('..');

    let SearchMock = function(){}
    HapiAwsCloudsearchMock.__set__("Search", SearchMock)

    const plugin = {
      register: HapiAwsCloudsearchMock,
      options: {
        region: 'us-west-1',
        cloudsearchdomain: '2013-01-01'
      }
    };

    server.register(plugin, (err) => {
      expect(err).to.not.exist();
      expect(server.plugins['hapi-aws-cloudsearch'].search).to.be.object();
      done();
    });
  });
});
